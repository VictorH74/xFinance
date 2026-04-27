import { api } from "@/lib/http/api-client";
import { ListableTransaction } from "./transaction.types";

export async function listTransactions(filters?: Record<string, unknown>): Promise<ListableTransaction[]> {
  const { data } = await api.get("/transaction", {params: filters});
  console.log('listTransactions >>> ', data)
  return data;
}

export async function createTransaction(payload: {
  description: string;
  amount: number;
  type: "income" | "expense";
}) {
  const { data } = await api.post("/transaction", payload);
  return data;
}