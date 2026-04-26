import { Router } from "express";
import { expressJsonRouteAdapter } from "../adapters/express-route-adapter";
import { makeGetDashboardDataController } from "../factories/controllers/dashboard/makeGetDashboardDataController";

// TODO: implement validations
export default function dashboardRoutes(router: Router) {
  router.get(
    "/dashboard",
    // validation,
    expressJsonRouteAdapter(makeGetDashboardDataController()),
  );
}
