import { UseCase } from "../UseCase";
import { ICategoryRepository } from "../../repositories/category.repository";

export interface ListCategoryUseCaseI extends UseCase<
  ListCategoryUseCaseI.Request,
  ListCategoryUseCaseI.Response
> {
  execute(userId: ListCategoryUseCaseI.Request): Promise<ListCategoryUseCaseI.Response>;
}

export namespace ListCategoryUseCaseI {
  ListCategoryUseCaseI;
  export type Request = ICategoryRepository.FindAllCategoryRequest;
  export type Response = ICategoryRepository.FindAllCategoryResponse;
}