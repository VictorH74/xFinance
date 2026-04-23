import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { UseCase } from "../UseCase";
import { ITransactionRepository } from "../../repositories/transaction.repository";

export interface RemoveTransactionUseCaseI extends UseCase<
  RemoveTransactionUseCaseI.Request,
  RemoveTransactionUseCaseI.Response
> {
  execute(
    reqBody: RemoveTransactionUseCaseI.Request,
  ): Promise<RemoveTransactionUseCaseI.Response>;
}

export namespace RemoveTransactionUseCaseI {
  RemoveTransactionUseCaseI;
  export type Request = ITransactionRepository.RemoveTransactionRequest;
  export type Response = void | InvalidDataError | Error;
}
