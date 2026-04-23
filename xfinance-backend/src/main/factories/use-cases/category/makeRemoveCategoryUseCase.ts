import { RemoveCategoryUseCaseI } from "@/application/interfaces/use-cases/category/RemoveCategoryUseCase";
import { RemoveCategoryUseCaseImpl } from "@/application/use-cases/category/RemoveCategoryUseCaseImpl";
import { categoryRepository } from "@/infra/database/prisma/CategoryRepositoryImpl";


export const makeRemoveCategoryUseCase = (): RemoveCategoryUseCaseI => {
    return new RemoveCategoryUseCaseImpl(categoryRepository)
};