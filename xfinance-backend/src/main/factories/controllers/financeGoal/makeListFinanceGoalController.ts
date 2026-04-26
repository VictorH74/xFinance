import { BaseController } from "@/infra/http/controllers/BaseController";
import { ListFinanceGoalController } from "@/infra/http/controllers/financeGoal/ListFinanceGoalController";
import { makeListFinanceGoalUseCase } from "../../use-cases/financeGoal/makeListFinanceGoalUseCase";

export const makeListFinanceGoalController = (): BaseController => {
  const useCase = makeListFinanceGoalUseCase();
  return new ListFinanceGoalController(useCase);
};
