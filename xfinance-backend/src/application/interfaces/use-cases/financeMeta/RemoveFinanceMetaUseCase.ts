import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { UseCase } from "../UseCase";
import { IFinanceGoalRepository } from "../../repositories/financeGoal.repository";

export interface RemoveFinanceGoalUseCaseI extends UseCase<
  RemoveFinanceGoalUseCaseI.Request,
  RemoveFinanceGoalUseCaseI.Response
> {
  execute(
    reqBody: RemoveFinanceGoalUseCaseI.Request,
  ): Promise<RemoveFinanceGoalUseCaseI.Response>;
}

export namespace RemoveFinanceGoalUseCaseI {
  RemoveFinanceGoalUseCaseI;
  export type Request = IFinanceGoalRepository.RemoveFinanceGoalRequest;
  export type Response = void | InvalidDataError | Error;
}
