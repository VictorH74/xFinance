import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeUpdateFinanceMetaUseCase } from "../../use-cases/financeMeta/makeUpdateFinanceMetaUseCase";
import { UpdateFinanceMetaController } from "@/infra/http/controllers/financeMeta/UpdateFinanceMetaController";

export const makeUpdateFinanceMetaController = (): BaseController => {
  const useCase = makeUpdateFinanceMetaUseCase();
  return new UpdateFinanceMetaController(useCase);
};
