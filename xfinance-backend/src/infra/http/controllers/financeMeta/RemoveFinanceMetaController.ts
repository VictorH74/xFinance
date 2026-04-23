import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import {
  badRequest,
  ok,
  serverError,
} from "@/infra/http/helpers/http";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { RemoveFinanceMetaUseCaseI } from "@/application/interfaces/use-cases/financeMeta/RemoveFinanceMetaUseCase";

export class RemoveFinanceMetaController extends BaseController {
  constructor(private readonly useCase: RemoveFinanceMetaUseCaseI) {
    super();
  }

  async execute(
    httpRequest: RemoveFinanceMetaController.Request,
  ): Promise<RemoveFinanceMetaController.Response> {
    const reqBody = httpRequest.body;

    const responseData = await this.useCase.execute(reqBody!);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace RemoveFinanceMetaController {
  export type Request = HttpRequest<RemoveFinanceMetaUseCaseI.Request>;
  export type Response = HttpResponse<RemoveFinanceMetaUseCaseI.Response>;
}
