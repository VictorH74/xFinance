import { ListCategoryUseCaseI } from "@/application/interfaces/use-cases/category/ListCategoryUseCase";
import { ListCategoryUseCaseImpl } from "@/application/use-cases/category/ListCategoryUseCaseImpl";
import { categoryRepository } from "@/infra/database/prisma/CategoryRepositoryImpl";


export const makeListCategoryUseCase = (): ListCategoryUseCaseI => {
    return new ListCategoryUseCaseImpl(categoryRepository)
};