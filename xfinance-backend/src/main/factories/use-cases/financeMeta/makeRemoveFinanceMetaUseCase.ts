import { RemoveFinanceMetaUseCaseI } from "@/application/interfaces/use-cases/financeMeta/RemoveFinanceMetaUseCase";
import { RemoveFinanceMetaUseCaseImpl } from "@/application/use-cases/financeMeta/RemoveFinanceMetaUseCaseImpl";
import { financeMetaRepository } from "@/infra/database/prisma/FinanceMetaRepositoryImpl";


export const makeRemoveFinanceMetaUseCase = (): RemoveFinanceMetaUseCaseI => {
    return new RemoveFinanceMetaUseCaseImpl(financeMetaRepository)
};