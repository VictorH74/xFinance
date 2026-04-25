import { ListFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeGoal/ListFinanceGoalUseCase";
import { ListFinanceGoalUseCaseImpl } from "@/application/use-cases/financeGoal/ListFinanceGoalUseCaseImpl";
import { financeGoalRepository } from "@/infra/database/prisma/FinanceGoalRepositoryImpl";


export const makeListFinanceGoalUseCase = (): ListFinanceGoalUseCaseI => {
    return new ListFinanceGoalUseCaseImpl(financeGoalRepository)
};