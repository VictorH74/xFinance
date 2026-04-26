import { IFinanceGoalRepository } from "@/application/interfaces/repositories/financeMeta.repository";
import { ListFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeMeta/ListFinanceMetaUseCase";


export class ListFinanceGoalUseCaseImpl implements ListFinanceGoalUseCaseI {
  constructor(private readonly repository: IFinanceGoalRepository) {}

  async execute(
    reqBody: ListFinanceGoalUseCaseI.Request,
  ): Promise<ListFinanceGoalUseCaseI.Response> {
    return this.repository.findAll(reqBody);
  }
}