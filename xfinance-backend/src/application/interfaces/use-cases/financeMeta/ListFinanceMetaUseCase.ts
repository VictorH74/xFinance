import { UseCase } from "../UseCase";
import { IFinanceGoalRepository } from "../../repositories/financeGoal.repository";

export interface ListFinanceGoalUseCaseI extends UseCase<
  ListFinanceGoalUseCaseI.Request,
  ListFinanceGoalUseCaseI.Response
> {
  execute(userId: ListFinanceGoalUseCaseI.Request): Promise<ListFinanceGoalUseCaseI.Response>;
}

export namespace ListFinanceGoalUseCaseI {
  ListFinanceGoalUseCaseI;
  export type Request = IFinanceGoalRepository.FindAllFinanceGoalRequest;
  export type Response = IFinanceGoalRepository.FindAllFinanceGoalResponse;
}
