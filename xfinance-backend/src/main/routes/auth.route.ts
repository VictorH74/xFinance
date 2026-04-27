import { Router } from "express";
import { expressJsonRouteAdapter } from "../adapters/express-route-adapter";
import { makeLoginController } from "../factories/controllers/auth/makeLoginController";
import { makeGetSessionController } from "../factories/controllers/auth/makeGetSessionController";
import { makeRefreshSessionController } from "../factories/controllers/auth/makeRefreshSessionController";
import { makeLogoutController } from "../factories/controllers/auth/makeLogoutController";
import { makeRegisterController } from "../factories/controllers/auth/makeRegisterController";
import { validate } from "../middlewares/validate";
import { loginDataSchema } from "@/infra/http/validations/auth/login.validation";
import { registerDataSchema } from "@/infra/http/validations/auth/register.validation";
import { refreshDataSchema } from "@/infra/http/validations/auth/refresh.validation";
import { sessionDataSchema } from "@/infra/http/validations/auth/session.validation";

export default function authRoutes(router: Router) {
  router.post("/auth/register", validate(registerDataSchema, "INVALID_DATA"), expressJsonRouteAdapter(makeRegisterController()));
  router.post("/auth/login", validate(loginDataSchema, "INVALID_DATA"), expressJsonRouteAdapter(makeLoginController()));
  router.get("/auth/session"/*, validate(sessionDataSchema, "INVALID_HEADER")*/, expressJsonRouteAdapter(makeGetSessionController()));
  router.post("/auth/refresh", validate(refreshDataSchema, "INVALID_DATA"), expressJsonRouteAdapter(makeRefreshSessionController()));
  router.post("/auth/logout", expressJsonRouteAdapter(makeLogoutController()));
}
