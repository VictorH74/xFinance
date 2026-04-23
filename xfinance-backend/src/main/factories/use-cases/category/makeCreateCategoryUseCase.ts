import { CreateCategoryUseCaseI } from "@/application/interfaces/use-cases/category/CreateCategoryUseCase";
import { CreateCategoryUseCaseImpl } from "@/application/use-cases/category/CreateCategoryUseCaseImpl";
import { categoryRepository } from "@/infra/database/prisma/CategoryRepositoryImpl";


export const makeCreateCategoryUseCase = (): CreateCategoryUseCaseI => {
    return new CreateCategoryUseCaseImpl(categoryRepository)
};