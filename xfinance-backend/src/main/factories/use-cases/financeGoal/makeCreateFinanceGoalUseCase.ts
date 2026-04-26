import { CreateFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeMeta/CreateFinanceMetaUseCase";
import { CreateFinanceGoalUseCaseImpl } from "@/application/use-cases/financeMeta/CreateFinanceMetaUseCaseImpl";
import { financeGoalRepository } from "@/infra/database/prisma/FinanceGoalRepositoryImpl";


export const makeCreateFinanceGoalUseCase = (): CreateFinanceGoalUseCaseI => {
    return new CreateFinanceGoalUseCaseImpl(financeGoalRepository)
};
