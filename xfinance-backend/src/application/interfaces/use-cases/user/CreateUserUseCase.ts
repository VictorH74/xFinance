import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { DuplicatedUserError } from "@/application/errors/user/DuplicatedUserError";
import { UseCase } from "@/application/interfaces/use-cases/UseCase";
import { IUserRepository } from "../../repositories/user.repository";

export interface CreateUserUseCaseI extends UseCase<
  CreateUserUseCaseI.Request,
  CreateUserUseCaseI.Response
> {
  execute(
    reqBody: CreateUserUseCaseI.Request,
  ): Promise<CreateUserUseCaseI.Response>;
}

export namespace CreateUserUseCaseI {
  export type Request = IUserRepository.SaveUserRequest;
  export type Response =
    | IUserRepository.SaveUserResponse
    | InvalidDataError
    | DuplicatedUserError;
}
