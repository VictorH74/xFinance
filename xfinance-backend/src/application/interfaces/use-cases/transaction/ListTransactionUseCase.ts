import { UseCase } from "../UseCase";
import { ITransactionRepository } from "../../repositories/transaction.repository";

export interface ListTransactionUseCaseI extends UseCase<
  ListTransactionUseCaseI.Request,
  ListTransactionUseCaseI.Response
> {
  execute(userId: ListTransactionUseCaseI.Request): Promise<ListTransactionUseCaseI.Response>;
}

export namespace ListTransactionUseCaseI {
  ListTransactionUseCaseI;
  export type Request = ITransactionRepository.FindAllTransactionRequest;
  export type Response = ITransactionRepository.FindAllTransactionResponse;
}
