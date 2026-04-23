import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeCreateCategoryUseCase } from "../../use-cases/category/makeCreateCategoryUseCase";
import { CreateCategoryController } from "@/infra/http/controllers/category/CreateCategoryController";

export const makeCreateCategoryController = (): BaseController => {
  const useCase = makeCreateCategoryUseCase();
  return new CreateCategoryController(useCase);
};
