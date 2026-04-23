import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeRemoveCategoryUseCase } from "../../use-cases/category/makeRemoveCategoryUseCase";
import { RemoveCategoryController } from "@/infra/http/controllers/category/RemoveCategoryController";


export const makeRemoveCategoryController = (): BaseController => {
  const useCase = makeRemoveCategoryUseCase();
  return new RemoveCategoryController(useCase);
};
