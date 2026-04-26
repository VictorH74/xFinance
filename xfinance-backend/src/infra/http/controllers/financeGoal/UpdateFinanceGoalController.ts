import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpRequest } from "@/infra/http/interfaces/HttpRequest";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import { badRequest, ok, serverError } from "@/infra/http/helpers/http";
import { InvalidDataError } from "@/application/errors/InvalidDataError";
import { UpdateFinanceGoalUseCaseI } from "@/application/interfaces/use-cases/financeMeta/UpdateFinanceMetaUseCase";

export class UpdateFinanceGoalController extends BaseController {
  constructor(private readonly CreateUser: UpdateFinanceGoalUseCaseI) {
    super();
  }

  async execute(
    httpRequest: UpdateFinanceGoalController.Request,
  ): Promise<UpdateFinanceGoalController.Response> {
    const reqBody = httpRequest.body

    if (!reqBody) return badRequest(Error("body not provided"));

    const responseData = await this.CreateUser.execute(reqBody);

    if (responseData instanceof InvalidDataError)
      return badRequest(responseData);

    if (responseData instanceof Error) return serverError(responseData);

    return ok(responseData);
  }
}

export namespace UpdateFinanceGoalController {
  export type Request = HttpRequest<UpdateFinanceGoalUseCaseI.Request>;
  export type Response = HttpResponse<UpdateFinanceGoalUseCaseI.Response>;
}

