import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import { badRequest, ok, serverError } from "@/infra/http/helpers/http";
import { ListTransactionUseCaseI } from "@/application/interfaces/use-cases/transaction/ListTransactionUseCase";
import { InvalidDataError } from "@/application/errors/InvalidDataError";

export class ListTransactionController extends BaseController {
  constructor(private readonly useCase: ListTransactionUseCaseI) {
    super();
  }

  async execute(
    httpRequest: ListTransactionController.Request,
  ): Promise<ListTransactionController.Response> {
    const reqBody = httpRequest.body;

    const responseData = await this.useCase.execute(reqBody!);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace ListTransactionController {
  export type Request = HttpRequest<ListTransactionUseCaseI.Request>;
  export type Response = HttpResponse<ListTransactionUseCaseI.Response>;
}
