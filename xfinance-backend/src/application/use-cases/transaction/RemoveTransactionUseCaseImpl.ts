import { ITransactionRepository } from "@/application/interfaces/repositories/transaction.repository";
import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { RemoveTransactionUseCaseI } from "@/application/interfaces/use-cases/transaction/RemoveTransactionUseCase";
import { RemoveUserUseCaseI } from "@/application/interfaces/use-cases/user/RemoveUserUseCase";

export class RemoveTransactionUseCaseImpl implements RemoveTransactionUseCaseI {
  constructor(private readonly repository: ITransactionRepository) {}

  async execute(
    id: RemoveTransactionUseCaseI.Request,
  ): Promise<RemoveTransactionUseCaseI.Response> {
    return this.repository.remove(id);
  }
}
