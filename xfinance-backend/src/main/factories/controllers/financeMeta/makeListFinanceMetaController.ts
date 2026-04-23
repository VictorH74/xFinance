import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeListFinanceMetaUseCase } from "../../use-cases/financeMeta/makeListFinanceMetaUseCase";
import { ListFinanceMetaController } from "@/infra/http/controllers/financeMeta/ListFinanceMetaController";

export const makeListFinanceMetaController = (): BaseController => {
  const useCase = makeListFinanceMetaUseCase();
  return new ListFinanceMetaController(useCase);
};
