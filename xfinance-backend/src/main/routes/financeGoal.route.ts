import { Router } from "express";
import { expressJsonRouteAdapter } from "../adapters/express-route-adapter";
import { makeListFinanceGoalController } from "../factories/controllers/financeGoal/makeListFinanceGoalController";
import { makeCreateFinanceGoalController } from "../factories/controllers/financeGoal/makeCreateFinanceGoalController";
import { makeRemoveFinanceGoalController } from "../factories/controllers/financeGoal/makeRemoveFinanceGoalController";
import { makeUpdateFinanceGoalController } from "../factories/controllers/financeGoal/makeUpdateFinanceGoalController";

// TODO: implement validations
export default function financeGoalRoutes(router: Router) {
  router.get(
    "/finance-goal/by-user/:userId",
    // validation,
    expressJsonRouteAdapter(makeListFinanceGoalController()),
  );
  router.post(
    "/finance-goal",
    // validation,
    expressJsonRouteAdapter(makeCreateFinanceGoalController()),
  );
  router.delete(
    "/finance-goal/:id",
    // validation,
    expressJsonRouteAdapter(makeRemoveFinanceGoalController()),
  );
  router.put(
    "/finance-goal/:id",
    // validation,
    expressJsonRouteAdapter(makeUpdateFinanceGoalController()),
  );
}
