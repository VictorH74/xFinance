import { UpdateFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeMeta/UpdateFinanceMetaUseCase";
import { UpdateFinanceGoalUseCaseImpl } from "@/application/use-cases/financeMeta/UpdateFinanceMetaUseCaseImpl";
import { financeGoalRepository } from "@/infra/database/prisma/FinanceGoalRepositoryImpl";

export const makeUpdateFinanceGoalUseCase = (): UpdateFinanceGoalUseCaseI => {
    return new UpdateFinanceGoalUseCaseImpl(financeGoalRepository)
};
