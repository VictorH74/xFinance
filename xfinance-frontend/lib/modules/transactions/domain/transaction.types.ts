import { Category } from "../../categories/domain/category.types";

export type Transaction = {
  id: string;
  user_id: string;
  categoryId: string | null;
  amount: number;
  type: "income" | "expense";
  description: string;
  date: string;
  source: "manual" | "ai_text" | "csv_import" | "ofx_import";
  aiRawText: string | null;
  importBatchId: string | null;
  created_at: string;
};

export type ListableTransaction = Omit<
  Transaction,
  "date" | "userId" | "categoryId" | "aiRawText" | "importBatchId" | "createdAt"
> & {
  date: Date;
  category: Pick<Category, "color" | "emoji" | "name" | "localizedName"> | null;
};

export type CreateTransactionsPayload = Pick<
  Transaction,
  | "aiRawText"
  | "source"
  | "date"
  | "description"
  | "categoryId"
  | "amount"
  | "importBatchId"
  | "type"
>[];

export type UpdateTransactionsPayload = Pick<
  Transaction,
  | "id"
  | "date"
  | "description"
  | "categoryId"
  | "amount"
  | "type"
>;
