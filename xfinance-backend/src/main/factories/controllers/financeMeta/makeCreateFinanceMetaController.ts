import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeCreateFinanceMetaUseCase } from "../../use-cases/financeMeta/makeCreateFinanceMetaUseCase";
import { CreateFinanceMetaController } from "@/infra/http/controllers/financeMeta/CreateFinanceMetaController";

export const makeCreateFinanceMetaController = (): BaseController => {
  const useCase = makeCreateFinanceMetaUseCase();
  return new CreateFinanceMetaController(useCase);
};
