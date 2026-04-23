import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeUpdateCategoryUseCase } from "../../use-cases/category/makeUpdateCategoryUseCase";
import { UpdateCategoryController } from "@/infra/http/controllers/category/UpdateCategoryController";

export const makeUpdateCategoryController = (): BaseController => {
  const useCase = makeUpdateCategoryUseCase();
  return new UpdateCategoryController(useCase);
};
