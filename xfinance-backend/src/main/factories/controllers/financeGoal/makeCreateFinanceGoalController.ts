import { BaseController } from "@/infra/http/controllers/BaseController";
import { CreateFinanceGoalController } from "@/infra/http/controllers/financeGoal/CreateFinanceGoalController";
import { makeCreateFinanceGoalUseCase } from "../../use-cases/financeGoal/makeCreateFinanceGoalUseCase";

export const makeCreateFinanceGoalController = (): BaseController => {
  const useCase = makeCreateFinanceGoalUseCase();
  return new CreateFinanceGoalController(useCase);
};
