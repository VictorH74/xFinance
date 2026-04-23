import { CreateTransactionUseCaseI } from "@/application/interfaces/use-cases/transaction/CreateTransactionUseCase";
import { CreateTransactionUseCaseImpl } from "@/application/use-cases/transaction/CreateTransactionUseCaseImpl";
import { transactionRepository } from "@/infra/database/prisma/TransactionRepositoryImpl";

export const makeCreateTransactionUseCase = (): CreateTransactionUseCaseI => {
    return new CreateTransactionUseCaseImpl(transactionRepository)
};