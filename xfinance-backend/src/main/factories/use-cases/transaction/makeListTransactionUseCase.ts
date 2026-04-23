import { ListTransactionUseCaseI } from "@/application/interfaces/use-cases/transaction/ListTransactionUseCase";
import { ListTransactionUseCaseImpl } from "@/application/use-cases/transaction/ListTransactionUseCaseImpl";
import { transactionRepository } from "@/infra/database/prisma/TransactionRepositoryImpl";

export const makeListTransactionUseCase = (): ListTransactionUseCaseI => {
    return new ListTransactionUseCaseImpl(transactionRepository)
};