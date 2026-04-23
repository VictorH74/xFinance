import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { UseCase } from "../UseCase";
import { ICategoryRepository } from "../../repositories/category.repository";

export interface RemoveCategoryUseCaseI extends UseCase<
  RemoveCategoryUseCaseI.Request,
  RemoveCategoryUseCaseI.Response
> {
  execute(
    reqBody: RemoveCategoryUseCaseI.Request,
  ): Promise<RemoveCategoryUseCaseI.Response>;
}

export namespace RemoveCategoryUseCaseI {
  RemoveCategoryUseCaseI;
  export type Request = ICategoryRepository.RemoveCategoryRequest;
  export type Response = void | InvalidDataError | Error;
}
