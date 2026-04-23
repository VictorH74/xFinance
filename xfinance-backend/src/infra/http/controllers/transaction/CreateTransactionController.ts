import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import {
  badRequest,
  ok,
  serverError,
} from "@/infra/http/helpers/http";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { CreateTransactionUseCaseI } from "@/application/interfaces/use-cases/transaction/CreateTransactionUseCase";

export class CreateTransactionController extends BaseController {
  constructor(private readonly useCase: CreateTransactionUseCaseI) {
    super();
  }

  async execute(
    httpRequest: CreateTransactionController.Request,
  ): Promise<CreateTransactionController.Response> {
    const reqBody = httpRequest.body;

    const responseData = await this.useCase.execute(reqBody!);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace CreateTransactionController {
  export type Request = HttpRequest<CreateTransactionUseCaseI.Request>;
  export type Response = HttpResponse<CreateTransactionUseCaseI.Response>;
}
