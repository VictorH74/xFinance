import { api } from "@/lib/http/api-client";
import { Category } from "./category.types";

export async function listCategories(filters?: Record<string, unknown>): Promise<Category[]> {
  const { data } = await api.get("/category", {params: filters});
  return data;
}

export async function createCategory(payload: {
  name: string;
  emoji: string;
  color: string;
  isDefault: boolean
}) {
  const { data } = await api.post("/category", payload);
  return data;
}