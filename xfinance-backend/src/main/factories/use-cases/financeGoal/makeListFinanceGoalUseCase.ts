import { ListFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeMeta/ListFinanceMetaUseCase";
import { ListFinanceGoalUseCaseImpl } from "@/application/use-cases/financeMeta/ListFinanceMetaUseCaseImpl";
import { financeGoalRepository } from "@/infra/database/prisma/FinanceGoalRepositoryImpl";


export const makeListFinanceGoalUseCase = (): ListFinanceGoalUseCaseI => {
    return new ListFinanceGoalUseCaseImpl(financeGoalRepository)
};
