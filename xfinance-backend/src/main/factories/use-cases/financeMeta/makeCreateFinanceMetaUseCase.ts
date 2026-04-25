import { CreateFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeGoal/CreateFinanceGoalUseCase";
import { CreateFinanceGoalUseCaseImpl } from "@/application/use-cases/financeGoal/CreateFinanceGoalUseCaseImpl";
import { financeGoalRepository } from "@/infra/database/prisma/FinanceGoalRepositoryImpl";


export const makeCreateFinanceGoalUseCase = (): CreateFinanceGoalUseCaseI => {
    return new CreateFinanceGoalUseCaseImpl(financeGoalRepository)
};