import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import {
  badRequest,
  ok,
  serverError,
} from "@/infra/http/helpers/http";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { RemoveFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeMeta/RemoveFinanceMetaUseCase";

export class RemoveFinanceGoalController extends BaseController {
  constructor(private readonly useCase: RemoveFinanceGoalUseCaseI) {
    super();
  }

  async execute(
    httpRequest: RemoveFinanceGoalController.Request,
  ): Promise<RemoveFinanceGoalController.Response> {
    const reqBody = httpRequest.body;

    const responseData = await this.useCase.execute(reqBody!);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace RemoveFinanceGoalController {
  export type Request = HttpRequest<RemoveFinanceGoalUseCaseI.Request>;
  export type Response = HttpResponse<RemoveFinanceGoalUseCaseI.Response>;
}
