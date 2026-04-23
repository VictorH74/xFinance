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
import { UpdateUserUseCaseI } from "@/application/interfaces/use-cases/user/UpdateUserUseCase";

export class UpdateUserController extends BaseController {
  constructor(private readonly useCase: UpdateUserUseCaseI) {
    super();
  }

  async execute(
    httpRequest: UpdateUserController.Request,
  ): Promise<UpdateUserController.Response> {
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

export namespace UpdateUserController {
  export type Request = HttpRequest<UpdateUserUseCaseI.Request>;
  export type Response = HttpResponse<UpdateUserUseCaseI.Response>;
}
