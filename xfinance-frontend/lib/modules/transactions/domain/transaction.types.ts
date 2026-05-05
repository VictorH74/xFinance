import { Category } from "../../categories/domain/category.types";

export type Transaction = {
  id: string;
  user_id: string;
  category_id: string | null;
  amount: number;
  type: "income" | "expense";
  description: string;
  date: string;
  source: "manual" | "ai_text" | "csv_import" | "ofx_import";
  ai_raw_text: string | null;
  import_batch_id: string | null;
  created_at: string;
};

export type ListableTransaction = Omit<
  Transaction,
  "date" | "userId" | "categoryId" | "aiRawText" | "importBatchId" | "createdAt"
> & {
  date: Date;
  category: Pick<Category, "color" | "emoji" | "name"> | null;
};

export type CreateTransactionsPayload = Pick<
  Transaction,
  | "ai_raw_text"
  | "source"
  | "date"
  | "description"
  | "category_id"
  | "amount"
  | "import_batch_id"
  | "type"
>[];

export type UpdateTransactionsPayload = Pick<
  Transaction,
  | "id"
  | "date"
  | "description"
  | "category_id"
  | "amount"
  | "type"
>;
