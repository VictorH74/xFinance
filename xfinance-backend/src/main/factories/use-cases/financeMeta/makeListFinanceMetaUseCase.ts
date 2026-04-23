import { ListFinanceMetaUseCaseI } from "@/application/interfaces/use-cases/financeMeta/ListFinanceMetaUseCase";
import { ListFinanceMetaUseCaseImpl } from "@/application/use-cases/financeMeta/ListFinanceMetaUseCaseImpl";
import { financeMetaRepository } from "@/infra/database/prisma/FinanceMetaRepositoryImpl";


export const makeListFinanceMetaUseCase = (): ListFinanceMetaUseCaseI => {
    return new ListFinanceMetaUseCaseImpl(financeMetaRepository)
};