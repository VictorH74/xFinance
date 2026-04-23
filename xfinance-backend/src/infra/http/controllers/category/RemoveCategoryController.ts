import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import {
  badRequest,
  ok,
  serverError,
} from "@/infra/http/helpers/http";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { RemoveCategoryUseCaseI } from "@/application/interfaces/use-cases/category/RemoveCategoryUseCase";

export class RemoveCategoryController extends BaseController {
  constructor(private readonly useCase: RemoveCategoryUseCaseI) {
    super();
  }

  async execute(
    httpRequest: RemoveCategoryController.Request,
  ): Promise<RemoveCategoryController.Response> {
    const reqBody = httpRequest.body;

    const responseData = await this.useCase.execute(reqBody!);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace RemoveCategoryController {
  export type Request = HttpRequest<RemoveCategoryUseCaseI.Request>;
  export type Response = HttpResponse<RemoveCategoryUseCaseI.Response>;
}
