export type Transaction = {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  type: string; // TODO: "income" | "expense"
  description: string | null;
  date: Date;
  source: string;
  aiRawText: string | null;
  importBatchId: string | null;
  createdAt: Date;
};
