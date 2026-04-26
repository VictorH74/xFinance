import { BaseController } from "@/infra/http/controllers/BaseController";
import { RemoveFinanceGoalController } from "@/infra/http/controllers/financeGoal/RemoveFinanceGoalController";
import { makeRemoveFinanceGoalUseCase } from "../../use-cases/financeGoal/makeRemoveFinanceGoalUseCase";

export const makeRemoveFinanceGoalController = (): BaseController => {
  const useCase = makeRemoveFinanceGoalUseCase();
  return new RemoveFinanceGoalController(useCase);
};
