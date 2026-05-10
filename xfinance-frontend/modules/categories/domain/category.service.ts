import { api } from "@/lib/http/api-client";
import {
  Category,
  CreateCategoryPayload,
  ListableCategory,
  UpdateCategoryPayload,
} from "./category.types";

export async function listCategories(
  filters?: Record<string, unknown>,
): Promise<ListableCategory[]> {
  const { data } = await api.get("/category", { params: filters });
  return data;
}

export async function createCategory(payload: CreateCategoryPayload) {
  const { data } = await api.post("/category", payload);
  return data;
}

export async function updateCategory({
  id,
  ...payload
}: UpdateCategoryPayload) {
  const { data } = await api.put(`/category/${id}`, payload);
  return data;
}

export async function deleteCategory(id: Category["id"]) {
  return api.delete(`/category/${id}`);
}
