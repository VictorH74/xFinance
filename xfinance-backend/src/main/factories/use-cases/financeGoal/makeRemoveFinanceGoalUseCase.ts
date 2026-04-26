import { RemoveFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeMeta/RemoveFinanceMetaUseCase";
import { RemoveFinanceGoalUseCaseImpl } from "@/application/use-cases/financeMeta/RemoveFinanceMetaUseCaseImpl";
import { financeGoalRepository } from "@/infra/database/prisma/FinanceGoalRepositoryImpl";


export const makeRemoveFinanceGoalUseCase = (): RemoveFinanceGoalUseCaseI => {
    return new RemoveFinanceGoalUseCaseImpl(financeGoalRepository)
};
