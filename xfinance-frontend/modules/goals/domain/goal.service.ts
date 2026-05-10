import { api } from "@/lib/http/api-client";
import {
  CreateGoalPayload,
  Goal,
  ListableGoal,
  UpdateGoalPayload,
} from "./goal.types";

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

export async function createGoal(payload: CreateGoalPayload) {
  const { data } = await api.post("/goal", payload);
  return data;
}

export async function updateGoal({id, ...payload}: UpdateGoalPayload) {
  const { data } = await api.put(`/goal/${id}`, payload);
  return data;
}

export async function deleteGoal(id: Goal["id"]) {
  return api.delete(`/goal/${id}`);
}
