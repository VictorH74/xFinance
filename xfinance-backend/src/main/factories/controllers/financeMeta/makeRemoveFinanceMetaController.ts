import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeRemoveFinanceMetaUseCase } from "../../use-cases/financeMeta/makeRemoveFinanceMetaUseCase";
import { RemoveFinanceMetaController } from "@/infra/http/controllers/financeMeta/RemoveFinanceMetaController";

export const makeRemoveFinanceMetaController = (): BaseController => {
  const useCase = makeRemoveFinanceMetaUseCase();
  return new RemoveFinanceMetaController(useCase);
};
