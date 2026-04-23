import { ITransactionRepository } from "@/application/interfaces/repositories/transaction.repository";
import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { UpdateTransactionUseCaseI } from "@/application/interfaces/use-cases/transaction/UpdateTransactionUseCase";
import { UpdateUserUseCaseI } from "@/application/interfaces/use-cases/user/UpdateUserUseCase";

export class UpdateTransactionUseCaseImpl implements UpdateTransactionUseCaseI {
  constructor(private readonly repository: ITransactionRepository) {}

  async execute(
    reqBody: UpdateTransactionUseCaseI.Request,
  ): Promise<UpdateTransactionUseCaseI.Response> {
    return this.repository.update(reqBody);
  }
}
