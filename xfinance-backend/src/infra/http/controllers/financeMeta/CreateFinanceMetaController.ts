import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import {
  badRequest,
  ok,
  serverError,
} from "@/infra/http/helpers/http";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { CreateFinanceMetaUseCaseI } from "@/application/interfaces/use-cases/financeMeta/CreateFinanceMetaUseCase";

export class CreateFinanceMetaController extends BaseController {
  constructor(private readonly useCase: CreateFinanceMetaUseCaseI) {
    super();
  }

  async execute(
    httpRequest: CreateFinanceMetaController.Request,
  ): Promise<CreateFinanceMetaController.Response> {
    const reqBody = httpRequest.body;

    const responseData = await this.useCase.execute(reqBody!);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace CreateFinanceMetaController {
  export type Request = HttpRequest<CreateFinanceMetaUseCaseI.Request>;
  export type Response = HttpResponse<CreateFinanceMetaUseCaseI.Response>;
}
