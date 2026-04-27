import { GetDashboardDataUseCaseI } from "@/application/interfaces/use-cases/dashboard/GetDashboardDataUseCase";
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
    emoji: string;
    color: string;
  } | null;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function toNumber(value: Decimal | null | undefined): number {
  return value ? Number(value) : 0;
}

function periodStart(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatMonth(date: Date): string {
  return date.toISOString().slice(0, 7); // 'YYYY-MM'
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

export class GetDashboardDataUseCaseImpl implements GetDashboardDataUseCaseI {
  async execute(
    {userId, ...data}: GetDashboardDataUseCaseI.Request,
  ): Promise<GetDashboardDataUseCaseI.Response> {
    // // temp
    // const userId = "2c8b6b44-1e24-4f4f-9df4-9ef0c0d8a101"

    // if ('minDate' in data) {
    //   data.
    // }

    const start = new Date();
    const fourMonthsAgo = periodStart(120);

    // duas queries em paralelo — não bloqueia uma na outra
    const [periodData, monthlyRaw] = await Promise.all([
      // ── Query 1: tudo que reage ao period ───────────────────────────────────
      prisma.transaction.findMany({
        where: {
          userId,
          // date: { gte: new Date("2026-01-15"), },
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
          AND date      >= ${fourMonthsAgo}
        GROUP BY date_trunc('month', date), type
        ORDER BY month ASC
      `,
    ]);

    // ── processa summary ────────────────────────────────────────────────────────
    let income_total = 0;
    let expense_total = 0;

    for (const t of periodData) {
    //   const amt = toNumber(t.amount);
    //   if (t.type === "income") income_total += amt;
    //   if (t.type === "expense") expense_total += amt;
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
      // if (row.type === "income") entry.income = toNumber(row.total);
      // if (row.type === "expense") entry.expense = toNumber(row.total);
    }

    const monthlyEvolution = Array.from(monthlyMap.values());

    const categoryMap = new Map<
      string,
      { name: string; emoji: string; color: string; total: number }
    >();

    for (const t of periodData) {
      if (t.type !== "expense") continue;

      const key = t.categoryId ?? "__uncategorized__";
      const name = t.category?.name ?? "Outros";
      const emoji = t.category?.emoji ?? "📦";
      const color = t.category?.color ?? "#98A2B3";
    //   const amt = toNumber(t.amount);

      if (!categoryMap.has(key)) {
        categoryMap.set(key, { name, emoji, color, total: 0 });
      }
      categoryMap.get(key)!.total += t.amount;
    //   categoryMap.get(key)!.total += amt;
    }

    const expensesByCategory: GetDashboardDataUseCaseI.Response["expensesByCategory"] =
      Array.from(categoryMap.entries())
        .map(([category_id, data]) => ({
          category_id: category_id === "__uncategorized__" ? null : category_id,
          name: data.name,
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
