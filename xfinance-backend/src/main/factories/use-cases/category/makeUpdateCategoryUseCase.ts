import { UpdateCategoryUseCaseI } from "@/application/interfaces/use-cases/category/UpdateCategoryUseCase";
import { UpdateCategoryUseCaseImpl } from "@/application/use-cases/category/UpdateCategoryUseCaseImpl";
import { categoryRepository } from "@/infra/database/prisma/CategoryRepositoryImpl";


export const makeUpdateCategoryUseCase = (): UpdateCategoryUseCaseI => {
    return new UpdateCategoryUseCaseImpl(categoryRepository)
};