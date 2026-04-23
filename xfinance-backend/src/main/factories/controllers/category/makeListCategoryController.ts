import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeListCategoryUseCase } from "../../use-cases/category/makeListCategoryUseCase";
import { ListCategoryController } from "@/infra/http/controllers/category/ListCategoryController";

export const makeListCategoryController = (): BaseController => {
  const useCase = makeListCategoryUseCase();
  return new ListCategoryController(useCase);
};
