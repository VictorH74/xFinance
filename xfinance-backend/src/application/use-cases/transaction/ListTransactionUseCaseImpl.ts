import { ITransactionRepository } from "@/application/interfaces/repositories/transaction.repository";
import { ListTransactionUseCaseI } from "@/application/interfaces/use-cases/transaction/ListTransactionUseCase";

export class ListTransactionUseCaseImpl implements ListTransactionUseCaseI {
  constructor(private readonly repository: ITransactionRepository) {}

  async execute(
    reqBody: ListTransactionUseCaseI.Request,
  ): Promise<ListTransactionUseCaseI.Response> {
    return this.repository.findAll(reqBody);
  }
}
