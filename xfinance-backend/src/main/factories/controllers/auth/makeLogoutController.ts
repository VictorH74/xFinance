import { BaseController } from "@/infra/http/controllers/BaseController";
import { LogoutController } from "@/infra/http/controllers/auth/LogoutController";

export const makeLogoutController = (): BaseController =>
  new LogoutController();
