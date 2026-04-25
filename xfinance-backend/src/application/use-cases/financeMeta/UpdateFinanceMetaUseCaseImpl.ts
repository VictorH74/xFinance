import { IFinanceGoalRepository } from "@/application/interfaces/repositories/financeGoal.repository";
import { IUserRepository } from "@/application/interfaces/repositories/user.repository";
import { UpdateFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeGoal/UpdateFinanceGoalUseCase";
import { UpdateUserUseCaseI } from "@/application/interfaces/use-cases/user/UpdateUserUseCase";

export class UpdateFinanceGoalUseCaseImpl implements UpdateFinanceGoalUseCaseI {
  constructor(private readonly repository: IFinanceGoalRepository) {}

  async execute(
    reqBody: UpdateFinanceGoalUseCaseI.Request,
  ): Promise<UpdateFinanceGoalUseCaseI.Response> {
    const obj = await this.repository.update(reqBody);

    return obj;
  }
}
