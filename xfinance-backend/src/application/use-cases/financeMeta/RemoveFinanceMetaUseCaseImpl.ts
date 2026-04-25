import { IFinanceGoalRepository } from "@/application/interfaces/repositories/financeGoal.repository";
import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { RemoveFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeGoal/RemoveFinanceGoalUseCase";
import { RemoveUserUseCaseI } from "@/application/interfaces/use-cases/user/RemoveUserUseCase";

export class RemoveFinanceGoalUseCaseImpl implements RemoveFinanceGoalUseCaseI {
  constructor(private readonly repository: IFinanceGoalRepository) {}

  async execute(
    id: RemoveFinanceGoalUseCaseI.Request,
  ): Promise<RemoveFinanceGoalUseCaseI.Response> {
    return this.repository.remove(id);
  }
}
