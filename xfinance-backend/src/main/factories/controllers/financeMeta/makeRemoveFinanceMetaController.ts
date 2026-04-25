import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeRemoveFinanceGoalUseCase } from "../../use-cases/financeGoal/makeRemoveFinanceGoalUseCase";
import { RemoveFinanceGoalController } from "@/infra/http/controllers/financeGoal/RemoveFinanceGoalController";

export const makeRemoveFinanceGoalController = (): BaseController => {
  const useCase = makeRemoveFinanceGoalUseCase();
  return new RemoveFinanceGoalController(useCase);
};
