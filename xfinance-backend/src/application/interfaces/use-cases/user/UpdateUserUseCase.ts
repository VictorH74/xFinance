import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { IUserRepository } from "../../repositories/user.repository";
import { UseCase } from "../UseCase";

export interface UpdateUserUseCaseI extends UseCase<
  UpdateUserUseCaseI.Request,
  UpdateUserUseCaseI.Response
> {
  execute(
    reqBody: UpdateUserUseCaseI.Request,
  ): Promise<UpdateUserUseCaseI.Response>;
}

export namespace UpdateUserUseCaseI {
  UpdateUserUseCaseI;
  export type Request = IUserRepository.UpdateUserRequest;
  export type Response = IUserRepository.UpdateUserResponse | InvalidDataError;
}
