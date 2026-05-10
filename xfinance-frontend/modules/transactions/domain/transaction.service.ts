import { api } from "@/lib/http/api-client";
import {
  CreateTransactionsPayload,
  ListableTransaction,
  Transaction,
  UpdateTransactionsPayload,
} from "./transaction.types";

export async function listTransactions(
  filters?: Record<string, unknown>,
): Promise<ListableTransaction[]> {
  const { data } = await api.get("/transaction", { params: filters });
  console.log("listTransactions >>> ", data);
  return data;
}

export async function createTransactions(payload: CreateTransactionsPayload) {
  const { data } = await api.post("/transaction", payload);
  return data;
}

export async function updateTransaction({
  id,
  ...payload
}: UpdateTransactionsPayload) {
  const { data } = await api.put(`/transaction/${id}`, payload);
  return data;
}

export async function deleteTransaction(id: Transaction["id"]) {
  return api.delete(`/transaction/${id}`);
}
