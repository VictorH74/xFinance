import { IFinanceGoalRepository } from "@/application/interfaces/repositories/financeMeta.repository";
import { UpdateFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeMeta/UpdateFinanceMetaUseCase";


export class UpdateFinanceGoalUseCaseImpl implements UpdateFinanceGoalUseCaseI {
  constructor(private readonly repository: IFinanceGoalRepository) {}

  async execute(
    reqBody: UpdateFinanceGoalUseCaseI.Request,
  ): Promise<UpdateFinanceGoalUseCaseI.Response> {
    const obj = await this.repository.update(reqBody);

    return obj;
  }
}
