import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { IUserRepository } from "../../repositories/user.repository";
import { UseCase } from "../UseCase";

export interface RemoveUserUseCaseI extends UseCase<
  RemoveUserUseCaseI.Request,
  RemoveUserUseCaseI.Response
> {
  execute(
    reqBody: RemoveUserUseCaseI.Request,
  ): Promise<RemoveUserUseCaseI.Response>;
}

export namespace RemoveUserUseCaseI {
  RemoveUserUseCaseI;
  export type Request = IUserRepository.RemoveUserRequest;
  export type Response = void | InvalidDataError | Error;
}
