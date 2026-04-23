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
import { DuplicatedUserError } from "@/application/errors/user/DuplicatedUserError";
import { RemoveUserUseCaseI } from "@/application/interfaces/use-cases/user/RemoveUserUseCase";

export class RemoveUserController extends BaseController {
  constructor(private readonly useCase: RemoveUserUseCaseI) {
    super();
  }

  async execute(
    httpRequest: RemoveUserController.Request,
  ): Promise<RemoveUserController.Response> {
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

export namespace RemoveUserController {
  export type Request = HttpRequest<RemoveUserUseCaseI.Request>;
  export type Response = HttpResponse<RemoveUserUseCaseI.Response>;
}
