import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import {
  badRequest,
  ok,
  serverError,
} from "@/infra/http/helpers/http";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { CreateCategoryUseCaseI } from "@/application/interfaces/use-cases/category/CreateCategoryUseCase";
import { includeUserId } from "@/main/utils/functions";

export class CreateCategoryController extends BaseController {
  constructor(private readonly useCase: CreateCategoryUseCaseI) {
    super();
  }

  async execute(
    httpRequest: CreateCategoryController.Request,
  ): Promise<CreateCategoryController.Response> {
    const reqBody = includeUserId(httpRequest);

    const responseData = await this.useCase.execute(reqBody!);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace CreateCategoryController {
  export type Request = HttpRequest<CreateCategoryUseCaseI.Request>;
  export type Response = HttpResponse<CreateCategoryUseCaseI.Response>;
}
