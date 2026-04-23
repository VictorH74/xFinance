import { ITransactionRepository } from "@/application/interfaces/repositories/transaction.repository";
import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { CreateTransactionUseCaseI } from "@/application/interfaces/use-cases/transaction/CreateTransactionUseCase";
import { CreateUserUseCaseI } from "@/application/interfaces/use-cases/user/CreateUserUseCase";

export class CreateTransactionUseCaseImpl implements CreateTransactionUseCaseI {
  constructor(private readonly repository: ITransactionRepository) {}

  async execute(
    reqBody: CreateTransactionUseCaseI.Request,
  ): Promise<CreateTransactionUseCaseI.Response> {
    const obj = await this.repository.save(reqBody);

    return obj;
  }
}
