import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { UseCase } from "../UseCase";
import { IFinanceGoalRepository } from "../../repositories/financeGoal.repository";

export interface UpdateFinanceGoalUseCaseI extends UseCase<
  UpdateFinanceGoalUseCaseI.Request,
  UpdateFinanceGoalUseCaseI.Response
> {
  execute(
    reqBody: UpdateFinanceGoalUseCaseI.Request,
  ): Promise<UpdateFinanceGoalUseCaseI.Response>;
}

export namespace UpdateFinanceGoalUseCaseI {
  UpdateFinanceGoalUseCaseI;
  export type Request = IFinanceGoalRepository.UpdateFinanceGoalRequest;
  export type Response = IFinanceGoalRepository.UpdateFinanceGoalResponse | InvalidDataError;
}
