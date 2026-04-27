import { api } from "@/lib/http/api-client";
import { Goal, ListableGoal } from "./goal.types";

export async function listGoals(
  filters?: Record<string, unknown>,
): Promise<ListableGoal[]> {
  const date = new Date();
  const { data } = await api.get(
    `/goal?periodMonth=${date.getMonth()}&periodYear=${date.getFullYear()}`,
    { params: filters },
  );
  return data;
}

export async function createGoal(payload: {
  categoryId: string | null;
  amountLimit: number;
  periodMonth: number;
  periodYear: number;
  isRecurring: boolean;
  notificationAt: number;
}) {
  const { data } = await api.post("/goal", payload);
  return data;
}
