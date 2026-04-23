import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { DuplicatedUserError } from "@/application/errors/user/DuplicatedUserError";
import { UseCase } from "@/application/interfaces/use-cases/UseCase";
import { IFinanceMetaRepository } from "../../repositories/financeMeta.repository";

export interface CreateFinanceMetaUseCaseI extends UseCase<
  CreateFinanceMetaUseCaseI.Request,
  CreateFinanceMetaUseCaseI.Response
> {
  execute(
    reqBody: CreateFinanceMetaUseCaseI.Request,
  ): Promise<CreateFinanceMetaUseCaseI.Response>;
}

export namespace CreateFinanceMetaUseCaseI {
  export type Request = IFinanceMetaRepository.SaveFinanceMetaRequest;
  export type Response =
    | IFinanceMetaRepository.SaveFinanceMetaResponse
    | InvalidDataError
    | DuplicatedUserError;
}
