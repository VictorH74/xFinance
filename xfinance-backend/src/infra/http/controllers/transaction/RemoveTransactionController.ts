import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import {
  badRequest,
  ok,
  serverError,
} from "@/infra/http/helpers/http";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { RemoveTransactionUseCaseI } from "@/application/interfaces/use-cases/transaction/RemoveTransactionUseCase";

export class RemoveTransactionController extends BaseController {
  constructor(private readonly useCase: RemoveTransactionUseCaseI) {
    super();
  }

  async execute(
    httpRequest: RemoveTransactionController.Request,
  ): Promise<RemoveTransactionController.Response> {
    const reqBody = httpRequest.body;

    const responseData = await this.useCase.execute(reqBody!);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace RemoveTransactionController {
  export type Request = HttpRequest<RemoveTransactionUseCaseI.Request>;
  export type Response = HttpResponse<RemoveTransactionUseCaseI.Response>;
}
