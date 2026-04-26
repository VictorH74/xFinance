import { ITransactionRepository } from "@/application/interfaces/repositories/transaction.repository";
import { CreateTransactionUseCaseI } from "@/application/interfaces/use-cases/transaction/CreateTransactionUseCase";

export class CreateTransactionUseCaseImpl implements CreateTransactionUseCaseI {
  constructor(private readonly repository: ITransactionRepository) {}

  async execute(
    reqBody: CreateTransactionUseCaseI.Request,
  ): Promise<CreateTransactionUseCaseI.Response> {
    const obj = await this.repository.save(reqBody);

    return obj;
  }
}
