import { Router } from "express";
import { expressJsonRouteAdapter } from "../adapters/express-route-adapter";
import { makeGetDashboardDataController } from "../factories/controllers/dashboard/makeGetDashboardDataController";
import { authValidation } from "../middlewares/authValidation";

// TODO: implement validations
export default function dashboardRoutes(router: Router) {
  // TODO: use post method instead
  router.get(
    "/dashboard",
    authValidation,
    // validate,
    expressJsonRouteAdapter(makeGetDashboardDataController()),
  );
}
