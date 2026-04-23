import { IFinanceMetaRepository } from "@/application/interfaces/repositories/financeMeta.repository";
import { ListFinanceMetaUseCaseI } from "@/application/interfaces/use-cases/financeMeta/ListFinanceMetaUseCase";

export class ListFinanceMetaUseCaseImpl implements ListFinanceMetaUseCaseI {
  constructor(private readonly repository: IFinanceMetaRepository) {}

  async execute(
    reqBody: ListFinanceMetaUseCaseI.Request,
  ): Promise<ListFinanceMetaUseCaseI.Response> {
    return this.repository.findAll(reqBody);
  }
}