import { UpdateTransactionUseCaseI } from "@/application/interfaces/use-cases/transaction/UpdateTransactionUseCase";
import { UpdateUserUseCaseI } from "@/application/interfaces/use-cases/user/UpdateUserUseCase";
import { UpdateTransactionUseCaseImpl } from "@/application/use-cases/transaction/UpdateTransactionUseCaseImpl";
import { UpdateUserUseCaseImpl } from "@/application/use-cases/user/UpdateUserUseCaseImpl";
import { transactionRepository } from "@/infra/database/prisma/TransactionRepositoryImpl";
import { userRepository } from "@/infra/database/prisma/UserRepositoryImpl";

export const makeUpdateTransactionUseCase = (): UpdateTransactionUseCaseI => {
    return new UpdateTransactionUseCaseImpl(transactionRepository)
};