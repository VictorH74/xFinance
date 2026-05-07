export type TransactionType = "income" | "expense";
export type TransactionSource = "manual" | "ai_text" | "csv_import" | "ofx_import";

export type Transaction = {
  id: string;
  userId: string;
  categoryId: string | null;
  amount: number;
  type: TransactionType;
  description: string | null;
  date: Date;
  source: TransactionSource;
  aiRawText: string | null;
  importBatchId: string | null;
  createdAt: Date;
};
