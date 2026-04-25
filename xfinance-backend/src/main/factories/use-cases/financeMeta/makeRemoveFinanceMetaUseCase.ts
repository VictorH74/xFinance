import { RemoveFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeGoal/RemoveFinanceGoalUseCase";
import { RemoveFinanceGoalUseCaseImpl } from "@/application/use-cases/financeGoal/RemoveFinanceGoalUseCaseImpl";
import { financeGoalRepository } from "@/infra/database/prisma/FinanceGoalRepositoryImpl";


export const makeRemoveFinanceGoalUseCase = (): RemoveFinanceGoalUseCaseI => {
    return new RemoveFinanceGoalUseCaseImpl(financeGoalRepository)
};