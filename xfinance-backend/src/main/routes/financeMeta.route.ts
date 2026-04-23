import { Router } from "express";
import { expressJsonRouteAdapter } from "../adapters/express-route-adapter";
import { makeListFinanceMetaController } from "../factories/controllers/financeMeta/makeListFinanceMetaController";
import { makeCreateFinanceMetaController } from "../factories/controllers/financeMeta/makeCreateFinanceMetaController";
import { makeRemoveFinanceMetaController } from "../factories/controllers/financeMeta/makeRemoveFinanceMetaController";
import { makeUpdateFinanceMetaController } from "../factories/controllers/financeMeta/makeUpdateFinanceMetaController";

// TODO: implement validations
export default function financeMetaRoutes(router: Router) {
  router.get(
    "finance-meta/by-user/:userId",
    // validation,
    expressJsonRouteAdapter(makeListFinanceMetaController()),
  );
  router.post(
    "finance-meta",
    // validation,
    expressJsonRouteAdapter(makeCreateFinanceMetaController()),
  );
  router.delete(
    "finance-meta/:id",
    // validation,
    expressJsonRouteAdapter(makeRemoveFinanceMetaController()),
  );
  router.put(
    "finance-meta/:id",
    // validation,
    expressJsonRouteAdapter(makeUpdateFinanceMetaController()),
  );
}
