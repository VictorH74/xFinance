import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import { badRequest, ok, serverError } from "@/infra/http/helpers/http";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { CreateFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeMeta/CreateFinanceMetaUseCase";
import { includeUserId } from "@/main/utils/functions";

export class CreateFinanceGoalController extends BaseController {
  constructor(private readonly useCase: CreateFinanceGoalUseCaseI) {
    super();
  }

  async execute(
    httpRequest: CreateFinanceGoalController.Request,
  ): Promise<CreateFinanceGoalController.Response> {
    const reqBody = includeUserId(httpRequest);

    const responseData = await this.useCase.execute(reqBody);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace CreateFinanceGoalController {
  export type Request = HttpRequest<CreateFinanceGoalUseCaseI.Request>;
  export type Response = HttpResponse<CreateFinanceGoalUseCaseI.Response>;
}
