import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { UseCase } from "../UseCase";
import { ICategoryRepository } from "../../repositories/category.repository";

export interface UpdateCategoryUseCaseI extends UseCase<
  UpdateCategoryUseCaseI.Request,
  UpdateCategoryUseCaseI.Response
> {
  execute(
    reqBody: UpdateCategoryUseCaseI.Request,
  ): Promise<UpdateCategoryUseCaseI.Response>;
}

export namespace UpdateCategoryUseCaseI {
  UpdateCategoryUseCaseI;
  export type Request = ICategoryRepository.UpdateCategoryRequest;
  export type Response = ICategoryRepository.UpdateCategoryResponse | InvalidDataError;
}
