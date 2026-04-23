import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeUpdateTransactionUseCase } from "../../use-cases/transaction/makeUpdateTransactionUseCase";
import { UpdateTransactionController } from "@/infra/http/controllers/transaction/UpdateTransactionController";

export const makeUpdateTransactionController = (): BaseController => {
  const useCase = makeUpdateTransactionUseCase();
  return new UpdateTransactionController(useCase);
};
