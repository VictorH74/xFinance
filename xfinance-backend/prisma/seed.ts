import "dotenv/config";
import { readFileSync } from "node:fs";
import { prisma } from "../src/main/lib/prisma";
import { hashPassword } from "../src/main/security/password";

type TransactionType = "income" | "expense";
type TransactionSource = "manual" | "ai_text" | "csv_import" | "ofx_import";
type LocalizedCategoryName = {
  en: string;
  "pt-BR": string;
};

type UserMock = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
};

type CategoryMock = {
  id: string;
  user_id: string;
  name: string;
  localizedName?: LocalizedCategoryName | null;
  emoji: string;
  color: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

type GoalMock = {
  id: string;
  user_id: string;
  categoryId: string | null;
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
  type: TransactionType;
  description: string | null;
  date: string;
  source: TransactionSource;
  aiRawText: string | null;
  importBatchId: string | null;
  created_at: string;
};

const readJson = <T>(relativePath: string): T => {
  const fileUrl = new URL(relativePath, import.meta.url);
  return JSON.parse(readFileSync(fileUrl, "utf-8")) as T;
};

const users = readJson<UserMock[]>("./data/mocks/users.json");
const categories = readJson<CategoryMock[]>("./data/mocks/categories.json");
const goals = readJson<GoalMock[]>("./data/mocks/goals.json");
const transactions = readJson<TransactionMock[]>("./data/mocks/transactions.json");

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.financeGoal.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: hashPassword(user.password),
      createdAt: new Date(user.created_at),
    })),
  });

  await prisma.category.createMany({
    data: categories.map((item) => ({
        id: item.id,
        userId: item.user_id,
        name: item.name,
        localizedName: item.localizedName ?? null,
        emoji: item.emoji,
        color: item.color,
        isDefault: item.is_default,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
      })),
  });

  await prisma.financeGoal.createMany({
    data: goals.map((item) => ({
      id: item.id,
      userId: item.user_id,
      categoryId: item.categoryId,
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
      categoryId: item.category?.id ?? null,
      amount: item.amount,
      type: item.type,
      description: item.description,
      date: new Date(item.date),
      source: item.source,
      aiRawText: item.aiRawText,
      importBatchId: item.importBatchId,
      createdAt: new Date(item.created_at),
    })),
  });

  console.log(
    `Seed concluido: ${users.length} users, ${categories.length} categories, ${goals.length} goals, ${transactions.length} transactions.`,
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
