import { Router } from "express";
import { expressJsonRouteAdapter } from "../adapters/express-route-adapter";
import { makeListFinanceGoalController } from "../factories/controllers/financeGoal/makeListFinanceGoalController";
import { makeCreateFinanceGoalController } from "../factories/controllers/financeGoal/makeCreateFinanceGoalController";
import { makeRemoveFinanceGoalController } from "../factories/controllers/financeGoal/makeRemoveFinanceGoalController";
import { makeUpdateFinanceGoalController } from "../factories/controllers/financeGoal/makeUpdateFinanceGoalController";
import { authValidation } from "../middlewares/authValidation";
import { validate } from "../middlewares/validate";
import { createFinanceGoalDataSchema } from "@/infra/http/validations/financeGoal/createFinanceGoal.validation";

// TODO: implement validations
export default function financeGoalRoutes(router: Router) {
  router.get(
    "/goal",
    authValidation,
    expressJsonRouteAdapter(makeListFinanceGoalController()),
  );
  router.post(
    "/goal",
    authValidation,
    validate(createFinanceGoalDataSchema, "INVALID_DATA"),
    expressJsonRouteAdapter(makeCreateFinanceGoalController()),
  );
  router.delete(
    "/goal/:id",
    authValidation,
    expressJsonRouteAdapter(makeRemoveFinanceGoalController()),
  );
  router.put(
    "/goal/:id",
    authValidation,
    expressJsonRouteAdapter(makeUpdateFinanceGoalController()),
  );
}
