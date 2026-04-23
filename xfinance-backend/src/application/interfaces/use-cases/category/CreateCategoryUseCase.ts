import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { DuplicatedUserError } from "@/application/errors/user/DuplicatedUserError";
import { UseCase } from "@/application/interfaces/use-cases/UseCase";
import { ICategoryRepository } from "../../repositories/category.repository";

export interface CreateCategoryUseCaseI extends UseCase<
  CreateCategoryUseCaseI.Request,
  CreateCategoryUseCaseI.Response
> {
  execute(
    reqBody: CreateCategoryUseCaseI.Request,
  ): Promise<CreateCategoryUseCaseI.Response>;
}

export namespace CreateCategoryUseCaseI {
  export type Request = ICategoryRepository.SaveCategoryRequest;
  export type Response =
    | ICategoryRepository.SaveCategoryResponse
    | InvalidDataError
    | DuplicatedUserError;
}
