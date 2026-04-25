import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeUpdateFinanceGoalUseCase } from "../../use-cases/financeGoal/makeUpdateFinanceGoalUseCase";
import { UpdateFinanceGoalController } from "@/infra/http/controllers/financeGoal/UpdateFinanceGoalController";

export const makeUpdateFinanceGoalController = (): BaseController => {
  const useCase = makeUpdateFinanceGoalUseCase();
  return new UpdateFinanceGoalController(useCase);
};
