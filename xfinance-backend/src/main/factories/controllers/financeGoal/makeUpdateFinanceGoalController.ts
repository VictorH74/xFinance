import { BaseController } from "@/infra/http/controllers/BaseController";
import { UpdateFinanceGoalController } from "@/infra/http/controllers/financeGoal/UpdateFinanceGoalController";
import { makeUpdateFinanceGoalUseCase } from "../../use-cases/financeGoal/makeUpdateFinanceGoalUseCase";

export const makeUpdateFinanceGoalController = (): BaseController => {
  const useCase = makeUpdateFinanceGoalUseCase();
  return new UpdateFinanceGoalController(useCase);
};
