import { Category } from "@/domain/entities/category";
import { User } from "@/domain/entities/user";

export interface ICategoryRepository {
  save(
    Category_data: ICategoryRepository.SaveCategoryRequest,
  ): Promise<ICategoryRepository.SaveCategoryResponse>;

  findAll(
    userId: ICategoryRepository.FindAllCategoryRequest,
  ): ICategoryRepository.FindAllCategoryResponse;

  update(
    Category_data: ICategoryRepository.UpdateCategoryRequest,
  ): Promise<ICategoryRepository.UpdateCategoryResponse>;

  remove(id: ICategoryRepository.RemoveCategoryRequest): Promise<void>;
}

export namespace ICategoryRepository {
  export type FindAllCategoryRequest = User["id"];
  export type RemoveCategoryRequest = Category["id"];
  export type SaveCategoryRequest = Omit<Category, "createdAt" | "id">;
  export type UpdateCategoryRequest = Omit<Category, "createdAt" | "id">;

  export type SaveCategoryResponse = Category["id"];
  export type FindAllCategoryResponse = Category[];
  export type UpdateCategoryResponse = Category;
}
