import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { IUserRepository } from "../../repositories/user.repository";
import { UseCase } from "../UseCase";
import { ITransactionRepository } from "../../repositories/transaction.repository";

export interface UpdateTransactionUseCaseI extends UseCase<
  UpdateTransactionUseCaseI.Request,
  UpdateTransactionUseCaseI.Response
> {
  execute(
    reqBody: UpdateTransactionUseCaseI.Request,
  ): Promise<UpdateTransactionUseCaseI.Response>;
}

export namespace UpdateTransactionUseCaseI {
  UpdateTransactionUseCaseI;
  export type Request = ITransactionRepository.UpdateTransactionRequest;
  export type Response = ITransactionRepository.UpdateTransactionResponse | InvalidDataError;
}
