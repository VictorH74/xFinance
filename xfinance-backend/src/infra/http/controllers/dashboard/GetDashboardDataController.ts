import { HttpRequest } from "../../interfaces/HttpRequest";
import { BaseController } from "../BaseController";
import { HttpResponse } from "../../interfaces/HttpResponse";
import { GetDashboardDataUseCaseI } from "@/application/interfaces/use-cases/dashboard/GetDashboardDataUseCase";
import { ok } from "../../helpers/http";

export class GetDashboardDataController extends BaseController {
  constructor(private readonly useCase: GetDashboardDataUseCaseI) {
    super();
  }

  async execute(
    httpRequest: GetDashboardDataController.Request,
  ): Promise<GetDashboardDataController.Response> {
    const requestData = (httpRequest.query ?? httpRequest.body ?? {}) as GetDashboardDataUseCaseI.Request;

    const responseData = await this.useCase.execute(requestData);

    return ok(responseData);
  }
}

export namespace GetDashboardDataController {
  export type Request = HttpRequest<GetDashboardDataUseCaseI.Request>;
  export type Response = HttpResponse<GetDashboardDataUseCaseI.Response>;
}
