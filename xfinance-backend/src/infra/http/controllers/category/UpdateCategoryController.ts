import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import {
  badRequest,
  ok,
  serverError,
} from "@/infra/http/helpers/http";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { UpdateCategoryUseCaseI } from "@/application/interfaces/use-cases/category/UpdateCategoryUseCase";

export class UpdateCategoryController extends BaseController {
  constructor(private readonly useCase: UpdateCategoryUseCaseI) {
    super();
  }

  async execute(
    httpRequest: UpdateCategoryController.Request,
  ): Promise<UpdateCategoryController.Response> {
    const reqBody = httpRequest.body;

    const responseData = await this.useCase.execute(reqBody!);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace UpdateCategoryController {
  export type Request = HttpRequest<UpdateCategoryUseCaseI.Request>;
  export type Response = HttpResponse<UpdateCategoryUseCaseI.Response>;
}
