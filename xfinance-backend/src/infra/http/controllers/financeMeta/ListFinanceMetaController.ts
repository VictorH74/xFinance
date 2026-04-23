import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import { badRequest, ok, serverError } from "@/infra/http/helpers/http";
import { ListFinanceMetaUseCaseI } from "@/application/interfaces/use-cases/financeMeta/ListFinanceMetaUseCase";
import { InvalidDataError } from "@/application/errors/InvalidDataError";

export class ListFinanceMetaController extends BaseController {
  constructor(private readonly useCase: ListFinanceMetaUseCaseI) {
    super();
  }

  async execute(
    httpRequest: ListFinanceMetaController.Request,
  ): Promise<ListFinanceMetaController.Response> {
    const reqBody = httpRequest.body;

    const responseData = await this.useCase.execute(reqBody!);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace ListFinanceMetaController {
  export type Request = HttpRequest<ListFinanceMetaUseCaseI.Request>;
  export type Response = HttpResponse<ListFinanceMetaUseCaseI.Response>;
}
