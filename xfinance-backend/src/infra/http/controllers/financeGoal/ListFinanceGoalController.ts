import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import { badRequest, ok, serverError } from "@/infra/http/helpers/http";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { ListFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeMeta/ListFinanceMetaUseCase";
import { includeUserId } from "@/main/utils/functions";

export class ListFinanceGoalController extends BaseController {
  constructor(private readonly useCase: ListFinanceGoalUseCaseI) {
    super();
  }

  async execute(
    httpRequest: ListFinanceGoalController.Request,
  ): Promise<ListFinanceGoalController.Response> {
    console.log('ListFinanceGoalController >>> httpRequest', httpRequest.params)

    const data = includeUserId(httpRequest, 'query');

    console.log('ListFinanceGoalController >> data', data)

    const responseData = await this.useCase.execute(data);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace ListFinanceGoalController {
  export type Request = HttpRequest<ListFinanceGoalUseCaseI.Request>;
  export type Response = HttpResponse<ListFinanceGoalUseCaseI.Response>;
}
