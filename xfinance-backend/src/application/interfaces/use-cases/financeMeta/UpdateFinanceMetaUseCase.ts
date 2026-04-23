import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { UseCase } from "../UseCase";
import { IFinanceMetaRepository } from "../../repositories/financeMeta.repository";

export interface UpdateFinanceMetaUseCaseI extends UseCase<
  UpdateFinanceMetaUseCaseI.Request,
  UpdateFinanceMetaUseCaseI.Response
> {
  execute(
    reqBody: UpdateFinanceMetaUseCaseI.Request,
  ): Promise<UpdateFinanceMetaUseCaseI.Response>;
}

export namespace UpdateFinanceMetaUseCaseI {
  UpdateFinanceMetaUseCaseI;
  export type Request = IFinanceMetaRepository.UpdateFinanceMetaRequest;
  export type Response = IFinanceMetaRepository.UpdateFinanceMetaResponse | InvalidDataError;
}
