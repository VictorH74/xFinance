import { BaseController } from "@/infra/http/controllers/BaseController";
import { HttpResponse } from "@/infra/http/interfaces/HttpResponse";
import { noContent } from "@/infra/http/helpers/http";

export class LogoutController extends BaseController {
  async execute(): Promise<HttpResponse> {
    return noContent();
  }
}
