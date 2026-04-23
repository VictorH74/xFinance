import { CreateFinanceMetaUseCaseI } from "@/application/interfaces/use-cases/financeMeta/CreateFinanceMetaUseCase";
import { CreateFinanceMetaUseCaseImpl } from "@/application/use-cases/financeMeta/CreateFinanceMetaUseCaseImpl";
import { financeMetaRepository } from "@/infra/database/prisma/FinanceMetaRepositoryImpl";


export const makeCreateFinanceMetaUseCase = (): CreateFinanceMetaUseCaseI => {
    return new CreateFinanceMetaUseCaseImpl(financeMetaRepository)
};