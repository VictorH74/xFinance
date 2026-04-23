import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeListTransactionUseCase } from "../../use-cases/transaction/makeListTransactionUseCase";
import { ListTransactionController } from "@/infra/http/controllers/transaction/ListTransactionController";

export const makeListTransactionController = (): BaseController => {
  const useCase = makeListTransactionUseCase();
  return new ListTransactionController(useCase);
};
