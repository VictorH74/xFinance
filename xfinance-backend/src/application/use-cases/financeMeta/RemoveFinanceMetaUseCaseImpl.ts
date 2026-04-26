import { IFinanceGoalRepository } from "@/application/interfaces/repositories/financeMeta.repository";
import { RemoveFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeMeta/RemoveFinanceMetaUseCase";

export class RemoveFinanceGoalUseCaseImpl implements RemoveFinanceGoalUseCaseI {
  constructor(private readonly repository: IFinanceGoalRepository) {}

  async execute(
    id: RemoveFinanceGoalUseCaseI.Request,
  ): Promise<RemoveFinanceGoalUseCaseI.Response> {
    return this.repository.remove(id);
  }
}
