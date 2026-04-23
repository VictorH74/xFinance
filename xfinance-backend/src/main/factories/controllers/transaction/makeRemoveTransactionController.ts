import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeRemoveTransactionUseCase } from "../../use-cases/transaction/makeRemoveTransactionUseCase";
import { RemoveTransactionController } from "@/infra/http/controllers/transaction/RemoveTransactionController";

export const makeRemoveTransactionController = (): BaseController => {
  const useCase = makeRemoveTransactionUseCase();
  return new RemoveTransactionController(useCase);
};
