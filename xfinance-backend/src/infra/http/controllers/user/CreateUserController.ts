import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import {
  badRequest,
  conflict,
  ok,
  serverError,
} from "@/infra/http/helpers/http";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { CreateUserUseCaseI } from "@/application/interfaces/use-cases/user/CreateUserUseCase";
import { DuplicatedUserError } from "@/application/errors/user/DuplicatedUserError";

export class CreateUserController extends BaseController {
  constructor(private readonly useCase: CreateUserUseCaseI) {
    super();
  }

  async execute(
    httpRequest: CreateUserController.Request,
  ): Promise<CreateUserController.Response> {
    const reqBody = httpRequest.body;

    const responseData = await this.useCase.execute(reqBody!);

    if (responseData instanceof DuplicatedUserError)
      return conflict(responseData);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);

  }
}

export namespace CreateUserController {
  export type Request = HttpRequest<CreateUserUseCaseI.Request>;
  export type Response = HttpResponse<CreateUserUseCaseI.Response>;
}
