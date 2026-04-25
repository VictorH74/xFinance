import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { DuplicatedUserError } from "@/application/errors/user/DuplicatedUserError";
import { UseCase } from "@/application/interfaces/use-cases/UseCase";
import { IFinanceGoalRepository } from "../../repositories/financeGoal.repository";

export interface CreateFinanceGoalUseCaseI extends UseCase<
  CreateFinanceGoalUseCaseI.Request,
  CreateFinanceGoalUseCaseI.Response
> {
  execute(
    reqBody: CreateFinanceGoalUseCaseI.Request,
  ): Promise<CreateFinanceGoalUseCaseI.Response>;
}

export namespace CreateFinanceGoalUseCaseI {
  export type Request = IFinanceGoalRepository.SaveFinanceGoalRequest;
  export type Response =
    | IFinanceGoalRepository.SaveFinanceGoalResponse
    | InvalidDataError
    | DuplicatedUserError;
}
