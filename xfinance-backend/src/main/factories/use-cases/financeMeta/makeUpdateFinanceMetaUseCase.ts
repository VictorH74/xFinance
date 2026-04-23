import { UpdateFinanceMetaUseCaseI } from "@/application/interfaces/use-cases/financeMeta/UpdateFinanceMetaUseCase";
import { UpdateFinanceMetaUseCaseImpl } from "@/application/use-cases/financeMeta/UpdateFinanceMetaUseCaseImpl";
import { financeMetaRepository } from "@/infra/database/prisma/FinanceMetaRepositoryImpl";

export const makeUpdateFinanceMetaUseCase = (): UpdateFinanceMetaUseCaseI => {
    return new UpdateFinanceMetaUseCaseImpl(financeMetaRepository)
};