import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeListFinanceGoalUseCase } from "../../use-cases/financeGoal/makeListFinanceGoalUseCase";
import { ListFinanceGoalController } from "@/infra/http/controllers/financeGoal/ListFinanceGoalController";

export const makeListFinanceGoalController = (): BaseController => {
  const useCase = makeListFinanceGoalUseCase();
  return new ListFinanceGoalController(useCase);
};
