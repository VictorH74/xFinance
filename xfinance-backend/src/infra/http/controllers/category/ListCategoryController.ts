import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import { badRequest, ok, serverError } from "@/infra/http/helpers/http";
import { ListCategoryUseCaseI } from "@/application/interfaces/use-cases/category/ListCategoryUseCase";
import { InvalidDataError } from "@/application/errors/InvalidDataError";

export class ListCategoryController extends BaseController {
  constructor(private readonly useCase: ListCategoryUseCaseI) {
    super();
  }

  async execute(
    httpRequest: ListCategoryController.Request,
  ): Promise<ListCategoryController.Response> {
    const reqBody = httpRequest.body;

    const responseData = await this.useCase.execute(reqBody!);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace ListCategoryController {
  export type Request = HttpRequest<ListCategoryUseCaseI.Request>;
  export type Response = HttpResponse<ListCategoryUseCaseI.Response>;
}
