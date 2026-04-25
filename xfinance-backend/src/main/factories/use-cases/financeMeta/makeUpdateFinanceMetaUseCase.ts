import { UpdateFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeGoal/UpdateFinanceGoalUseCase";
import { UpdateFinanceGoalUseCaseImpl } from "@/application/use-cases/financeGoal/UpdateFinanceGoalUseCaseImpl";
import { financeGoalRepository } from "@/infra/database/prisma/FinanceGoalRepositoryImpl";

export const makeUpdateFinanceGoalUseCase = (): UpdateFinanceGoalUseCaseI => {
    return new UpdateFinanceGoalUseCaseImpl(financeGoalRepository)
};