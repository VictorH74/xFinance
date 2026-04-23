import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import {
  badRequest,
  ok,
  serverError,
} from "@/infra/http/helpers/http";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { UpdateFinanceMetaUseCaseI } from "@/application/interfaces/use-cases/financeMeta/UpdateFinanceMetaUseCase";

export class UpdateFinanceMetaController extends BaseController {
  constructor(private readonly CreateUser: UpdateFinanceMetaUseCaseI) {
    super();
  }

  async execute(
    httpRequest: UpdateFinanceMetaController.Request,
  ): Promise<UpdateFinanceMetaController.Response> {
    const reqBody = httpRequest.body;

    const responseData = await this.CreateUser.execute(reqBody!);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace UpdateFinanceMetaController {
  export type Request = HttpRequest<UpdateFinanceMetaUseCaseI.Request>;
  export type Response = HttpResponse<UpdateFinanceMetaUseCaseI.Response>;
}
