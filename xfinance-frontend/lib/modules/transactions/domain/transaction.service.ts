import { api } from "@/lib/http/api-client";
import { Transaction } from "./transaction.types";

type ListTransactionsResponse = Transaction[];

export async function listTransactions(filters?: Record<string, unknown>): Promise<ListTransactionsResponse> {
  const { data } = await api.get("/transactions", {params: filters});
  return data;
}

export async function createTransaction(payload: {
  description: string;
  amount: number;
  type: "income" | "expense";
}) {
  const { data } = await api.post("/transactions", payload);
  return data;
}