import { RemoveTransactionUseCaseI } from "@/application/interfaces/use-cases/transaction/RemoveTransactionUseCase";
import { RemoveTransactionUseCaseImpl } from "@/application/use-cases/transaction/RemoveTransactionUseCaseImpl";
import { transactionRepository } from "@/infra/database/prisma/TransactionRepositoryImpl";

export const makeRemoveTransactionUseCase = (): RemoveTransactionUseCaseI => {
    return new RemoveTransactionUseCaseImpl(transactionRepository)
};