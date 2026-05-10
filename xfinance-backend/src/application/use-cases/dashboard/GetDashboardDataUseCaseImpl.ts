import { GetDashboardDataUseCaseI } from "@/application/interfaces/use-cases/dashboard/GetDashboardDataUseCase";
import { TransactionType } from "@/domain/entities/transaction.entity";
import { prisma } from "@/main/lib/prisma";
import { Decimal } from "@prisma/client/runtime/index-browser";

export const VALID_PERIODS = ["7d", "30d", "90d"] as const;
export type Period = (typeof VALID_PERIODS)[number];

const PERIOD_DAYS: Record<Period, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

interface RecentTransaction {
  id: string;
  description: string;
  amount: number;
  type: string;
  date: string; // 'YYYY-MM-DD'
  category: {
    name: string;
    localizedName?: {
      en: string;
      "pt-BR": string;
    } | null;
    emoji: string;
    color: string;
  } | null;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

const toStringArray = (input: string[] | string): string[] => {
  if (Array.isArray(input)) return input;
  if (typeof input === "string") return [input];
  return [];
}

function getFourMonthsAgoDate(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setMonth(d.getMonth() - 3);
  return d;
}

function formatMonth(date: Date): string {
  return date.toISOString().slice(0, 7); // 'YYYY-MM'
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

export class GetDashboardDataUseCaseImpl implements GetDashboardDataUseCaseI {
  async execute({
    userId,
    ...data
  }: GetDashboardDataUseCaseI.Request): Promise<GetDashboardDataUseCaseI.Response> {
    const categoryIds = toStringArray(data.categoryIds ?? []);
    const includesUncategorized = categoryIds.includes("__uncategorized__");
    const selectedCategoryIds = categoryIds.filter(
      (categoryId) => categoryId !== "__uncategorized__",
    );
    let dateConfig = undefined;

    if ("startDate" in data)
      dateConfig = { gte: new Date(data.startDate), lte: new Date(data.endDate) };
    else {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - PERIOD_DAYS["90d"]);

      dateConfig = { gte: startDate, lte: endDate };
    }

    const fourMonthsAgoDate = getFourMonthsAgoDate();
    const categoryFilter =
      categoryIds.length === 0
        ? undefined
        : includesUncategorized
          ? selectedCategoryIds.length > 0
            ? {
                OR: [
                  { categoryId: { in: selectedCategoryIds } },
                  { categoryId: null },
                ],
              }
            : { categoryId: null }
          : { categoryId: { in: selectedCategoryIds } };

    // duas queries em paralelo — não bloqueia uma na outra
    const [periodData, monthlyRaw] = await Promise.all([
      // ── Query 1: tudo que reage ao period ───────────────────────────────────
      prisma.transaction.findMany({
        where: {
          userId,
          date: dateConfig,
          type: data.transactionType as TransactionType | undefined,
          ...categoryFilter,
        },
        orderBy: [{ date: "desc" }, { createdAt: "desc" }],
        select: {
          id: true,
          description: true,
          amount: true,
          type: true,
          date: true,
          categoryId: true,
          source: true,
          category: {
            select: {
              id: true,
              name: true,
              localizedName: true,
              emoji: true,
              color: true,
            },
          },
        },
      }),
      prisma.$queryRaw<Array<{ month: Date; type: string; total: number }>>`
        SELECT
          date_trunc('month', date)::date AS month,
          type,
          SUM(amount)                     AS total
        FROM "Transaction"
        WHERE "userId"    = ${userId}
          AND date      >= ${fourMonthsAgoDate}
        GROUP BY date_trunc('month', date), type
        ORDER BY month ASC
      `,
    ]);

    // ── processa summary ────────────────────────────────────────────────────────
    let income_total = 0;
    let expense_total = 0;

    for (const t of periodData) {
      if (t.type === "income") income_total += t.amount;
      if (t.type === "expense") expense_total += t.amount;
    }

    const balance = income_total - expense_total;
    const savingsRate =
      income_total > 0 ? Math.round((balance / income_total) * 100) / 100 : 0;

    const monthlyMap = new Map<
      string,
      GetDashboardDataUseCaseI.Response["monthlyEvolution"][number]
    >();

    for (const row of monthlyRaw) {
      const key = formatMonth(new Date(row.month));
      if (!monthlyMap.has(key)) {
        monthlyMap.set(key, { month: key, income: 0, expense: 0 });
      }
      const entry = monthlyMap.get(key)!;
      if (row.type === "income") entry.income = row.total;
      if (row.type === "expense") entry.expense = row.total;
    }

    const monthlyEvolution = Array.from(monthlyMap.values());

    // fill missing months
    let remianingMonthCount = 4 - monthlyEvolution.length;
    if (remianingMonthCount > 0 && monthlyEvolution.length > 0) {
      const minMonthDate = monthlyEvolution[0].month
      const [year, month] = minMonthDate.split('-')

      for (let i = 1; i <= remianingMonthCount; i++) {
        const monthNumber = Number(month) - i
        let adjustedYear = Number(year)
        let adjustedMonth = monthNumber

        if (monthNumber <= 0) {
          adjustedYear -= 1
          adjustedMonth = 12 + monthNumber
        }

        const d = new Date(adjustedYear, adjustedMonth - 1, 1)
        const monthKey = formatMonth(d)
        monthlyEvolution.unshift({ month: monthKey, income: 0, expense: 0 })
      }
    }

    const categoryMap = new Map<
      string,
      {
        name: string;
        localizedName?: {
          en: string;
          "pt-BR": string;
        } | null;
        emoji: string;
        color: string;
        total: number;
      }
    >();

    for (const t of periodData) {
      if (t.type !== "expense") continue;

      const key = t.categoryId ?? "__uncategorized__";
      const name = t.category?.name ?? "Outros";
      const localizedName =
        t.category?.localizedName ??
        (t.categoryId
          ? null
          : { en: "Uncategorized", "pt-BR": "Sem categoria" });
      const emoji = t.category?.emoji ?? "📦";
      const color = t.category?.color ?? "#98A2B3";

      if (!categoryMap.has(key)) {
        categoryMap.set(key, { name, localizedName, emoji, color, total: 0 });
      }
      categoryMap.get(key)!.total += t.amount;
    }

    const expensesByCategory: GetDashboardDataUseCaseI.Response["expensesByCategory"] =
      Array.from(categoryMap.entries())
        .map(([categoryId, data]) => ({
          categoryId: categoryId,
          name: data.name,
          localizedName: data.localizedName,
          emoji: data.emoji,
          color: data.color,
          total: Math.round(data.total * 100) / 100,
          percentage:
            expense_total > 0
              ? Math.round((data.total / expense_total) * 100)
              : 0,
        }))
        .sort((a, b) => b.total - a.total);

    // ── processa recent_transactions (5 mais recentes) ──────────────────────────
    const recentTransactions: GetDashboardDataUseCaseI.Response["recentTransactions"] =
      periodData.slice(0, 5).map((t) => ({
        id: t.id,
        description: t.description,
        amount: t.amount,
        // amount: toNumber(t.amount),
        type: t.type,
        date: formatDate(new Date(t.date)),
        source: t.source,
        category: t.category
          ? {
              name: t.category.name,
              localizedName: t.category.localizedName,
              emoji: t.category.emoji,
              color: t.category.color,
            }
          : null,
      }));

    return {
      summary: {
        balance: Math.round(balance * 100) / 100,
        incomeTotal: Math.round(income_total * 100) / 100,
        expenseTotal: Math.round(expense_total * 100) / 100,
        savingsRate,
      },
      monthlyEvolution,
      expensesByCategory,
      recentTransactions,
    };
  }
}
