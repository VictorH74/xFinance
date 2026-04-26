import "dotenv/config";
import { readFileSync } from "node:fs";
import { prisma } from "../src/main/lib/prisma";
import { hashPassword } from "../src/main/security/password";

type CategoryMock = {
  id: string;
  user_id: string;
  name: string;
  emoji: string;
  color: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

type GoalMock = {
  id: string;
  user_id: string;
  category_id: string | null;
  amount_limit: number;
  period_month: number;
  period_year: number;
  is_recurring: boolean;
  notification_at: number;
  created_at: string;
};

type TransactionMock = {
  id: string;
  user_id: string;
  category: {
    id: string;
    name: string;
    emoji: string;
    color: string;
  } | null;
  amount: number;
  type: string;
  description: string | null;
  date: string;
  source: string;
  ai_raw_text: string | null;
  import_batch_id: string | null;
  created_at: string;
};

const readJson = <T>(relativePath: string): T => {
  const fileUrl = new URL(relativePath, import.meta.url);
  return JSON.parse(readFileSync(fileUrl, "utf-8")) as T;
};

const categories = readJson<CategoryMock[]>("./data/mocks/categories.json");
const goals = readJson<GoalMock[]>("./data/mocks/goals.json");
const transactions = readJson<TransactionMock[]>("./data/mocks/transactions.json");

const buildUncategorizedId = (userId: string) => {
  const normalized = userId.replace(/-/g, "").slice(0, 12).padEnd(12, "0");
  return `00000000-0000-4000-8000-${normalized}`;
};

async function main() {
  const userIds = Array.from(
    new Set([
      ...categories.map((item) => item.user_id),
      ...goals.map((item) => item.user_id),
      ...transactions.map((item) => item.user_id),
    ]),
  );

  const existingCategoryIds = new Set(categories.map((item) => item.id));
  const uncategorizedUsers = Array.from(
    new Set(
      transactions
        .filter((item) => item.category === null)
        .map((item) => item.user_id),
    ),
  );

  await prisma.transaction.deleteMany();
  await prisma.financeGoal.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: userIds.map((userId, index) => ({
      id: userId,
      name: userIds.length === 1 ? "Mock User" : `Mock User ${index + 1}`,
      email:
        userIds.length === 1
          ? "mock-user@xfinance.local"
          : `mock-user-${index + 1}@xfinance.local`,
      password: hashPassword("123456"),
      createdAt: new Date("2026-01-01T00:00:00Z"),
    })),
  });

  await prisma.category.createMany({
    data: [
      ...categories.map((item) => ({
        id: item.id,
        userId: item.user_id,
        name: item.name,
        emoji: item.emoji,
        color: item.color,
        isDefault: item.is_default,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
      })),
      ...uncategorizedUsers
        .filter((userId) => !existingCategoryIds.has(buildUncategorizedId(userId)))
        .map((userId) => ({
          id: buildUncategorizedId(userId),
          userId,
          name: "Sem categoria",
          emoji: "📦",
          color: "#94A3B8",
          isDefault: true,
          createdAt: new Date("2026-01-01T00:00:00Z"),
          updatedAt: new Date("2026-01-01T00:00:00Z"),
        })),
    ],
  });

  await prisma.financeGoal.createMany({
    data: goals.map((item) => ({
      id: item.id,
      userId: item.user_id,
      categoryId: item.category_id,
      amountLimit: item.amount_limit,
      periodMonth: item.period_month,
      periodYear: item.period_year,
      isRecurring: item.is_recurring,
      notificationAt: item.notification_at,
      createdAt: new Date(item.created_at),
    })),
  });

  await prisma.transaction.createMany({
    data: transactions.map((item) => ({
      id: item.id,
      userId: item.user_id,
      categoryId: item.category?.id ?? buildUncategorizedId(item.user_id),
      amount: item.amount,
      type: item.type,
      description: item.description,
      date: new Date(item.date),
      source: item.source,
      aiRawText: item.ai_raw_text,
      importBatchId: item.import_batch_id,
      createdAt: new Date(item.created_at),
    })),
  });

  console.log(
    `Seed concluido: ${userIds.length} users, ${categories.length} categories, ${goals.length} goals, ${transactions.length} transactions.`,
  );
}

main()
  .catch((error) => {
    console.error("Erro ao rodar seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
