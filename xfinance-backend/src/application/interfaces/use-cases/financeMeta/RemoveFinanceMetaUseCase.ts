import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { UseCase } from "../UseCase";
import { IFinanceMetaRepository } from "../../repositories/financeMeta.repository";

export interface RemoveFinanceMetaUseCaseI extends UseCase<
  RemoveFinanceMetaUseCaseI.Request,
  RemoveFinanceMetaUseCaseI.Response
> {
  execute(
    reqBody: RemoveFinanceMetaUseCaseI.Request,
  ): Promise<RemoveFinanceMetaUseCaseI.Response>;
}

export namespace RemoveFinanceMetaUseCaseI {
  RemoveFinanceMetaUseCaseI;
  export type Request = IFinanceMetaRepository.RemoveFinanceMetaRequest;
  export type Response = void | InvalidDataError | Error;
}
