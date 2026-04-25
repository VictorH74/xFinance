import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import { badRequest, ok, serverError } from "@/infra/http/helpers/http";
import { ListFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeGoal/ListFinanceGoalUseCase";
import { InvalidDataError } from "@/application/errors/InvalidDataError";

export class ListFinanceGoalController extends BaseController {
  constructor(private readonly useCase: ListFinanceGoalUseCaseI) {
    super();
  }

  async execute(
    httpRequest: ListFinanceGoalController.Request,
  ): Promise<ListFinanceGoalController.Response> {
    const reqBody = httpRequest.body;

    const responseData = await this.useCase.execute(reqBody!);

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
