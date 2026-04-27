import { Category } from "@/domain/entities/category.entity";
import { User } from "@/domain/entities/user.entity";

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
  export type SaveCategoryRequest = Omit<
    Category,
    "createdAt" | "id" | "updatedAt"
  >;
  export type UpdateCategoryRequest = Pick<Category, "id"> &
    Partial<Omit<Category, "createdAt" | "updatedAt" | "userId">>;

  export type SaveCategoryResponse = Category["id"];
  export type FindAllCategoryResponse = Category[];
  export type UpdateCategoryResponse = Category;
}
