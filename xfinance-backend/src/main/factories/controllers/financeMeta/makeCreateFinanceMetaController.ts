import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeCreateFinanceGoalUseCase } from "../../use-cases/financeGoal/makeCreateFinanceGoalUseCase";
import { CreateFinanceGoalController } from "@/infra/http/controllers/financeGoal/CreateFinanceGoalController";

export const makeCreateFinanceGoalController = (): BaseController => {
  const useCase = makeCreateFinanceGoalUseCase();
  return new CreateFinanceGoalController(useCase);
};
