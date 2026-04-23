import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeCreateTransactionUseCase } from "../../use-cases/transaction/makeCreateTransactionUseCase";
import { CreateTransactionController } from "@/infra/http/controllers/transaction/CreateTransactionController";

export const makeCreateTransactionController = (): BaseController => {
  const useCase = makeCreateTransactionUseCase();
  return new CreateTransactionController(useCase);
};
