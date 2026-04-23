import { UseCase } from "../UseCase";
import { IFinanceMetaRepository } from "../../repositories/financeMeta.repository";

export interface ListFinanceMetaUseCaseI extends UseCase<
  ListFinanceMetaUseCaseI.Request,
  ListFinanceMetaUseCaseI.Response
> {
  execute(userId: ListFinanceMetaUseCaseI.Request): Promise<ListFinanceMetaUseCaseI.Response>;
}

export namespace ListFinanceMetaUseCaseI {
  ListFinanceMetaUseCaseI;
  export type Request = IFinanceMetaRepository.FindAllFinanceMetaRequest;
  export type Response = IFinanceMetaRepository.FindAllFinanceMetaResponse;
}
