import { Router } from "express";
import { expressJsonRouteAdapter } from "../adapters/express-route-adapter";
import { makeLoginController } from "../factories/controllers/auth/makeLoginController";
import { makeGetSessionController } from "../factories/controllers/auth/makeGetSessionController";
import { makeRefreshSessionController } from "../factories/controllers/auth/makeRefreshSessionController";
import { makeLogoutController } from "../factories/controllers/auth/makeLogoutController";
import { makeRegisterController } from "../factories/controllers/auth/makeRegisterController";

export default function authRoutes(router: Router) {
  router.post("/auth/signup", expressJsonRouteAdapter(makeRegisterController()));
  router.post("/auth/login", expressJsonRouteAdapter(makeLoginController()));
  router.get("/auth/session", expressJsonRouteAdapter(makeGetSessionController()));
  router.post("/auth/refresh", expressJsonRouteAdapter(makeRefreshSessionController()));
  router.post("/auth/logout", expressJsonRouteAdapter(makeLogoutController()));
}
