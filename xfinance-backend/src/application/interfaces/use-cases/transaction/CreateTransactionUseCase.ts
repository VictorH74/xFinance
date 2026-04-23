import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { DuplicatedUserError } from "@/application/errors/user/DuplicatedUserError";
import { UseCase } from "@/application/interfaces/use-cases/UseCase";
import { ITransactionRepository } from "../../repositories/transaction.repository";

export interface CreateTransactionUseCaseI extends UseCase<
  CreateTransactionUseCaseI.Request,
  CreateTransactionUseCaseI.Response
> {
  execute(
    reqBody: CreateTransactionUseCaseI.Request,
  ): Promise<CreateTransactionUseCaseI.Response>;
}

export namespace CreateTransactionUseCaseI {
  export type Request = ITransactionRepository.SaveTransactionRequest;
  export type Response =
    | ITransactionRepository.SaveTransactionResponse
    | InvalidDataError
    | DuplicatedUserError;
}
