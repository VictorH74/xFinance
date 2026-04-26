import { Router } from "express";
import { expressJsonRouteAdapter } from "../adapters/express-route-adapter";
import { makeListTransactionController } from "../factories/controllers/transaction/makeListTransactionController";
import { makeCreateTransactionController } from "../factories/controllers/transaction/makeCreateTransactionController";
import { makeRemoveTransactionController } from "../factories/controllers/transaction/makeRemoveTransactionController";
import { makeUpdateTransactionController } from "../factories/controllers/transaction/makeUpdateTransactionController";

// TODO: implement validations
export default function transactionRoutes(router: Router) {
  router.get(
    "/transaction/by-user/:userId",
    // validation,
    expressJsonRouteAdapter(makeListTransactionController()),
  );
  router.post(
    "/transaction",
    // validation,
    expressJsonRouteAdapter(makeCreateTransactionController()),
  );
  router.delete(
    "/transaction/:id",
    // validation,
    expressJsonRouteAdapter(makeRemoveTransactionController()),
  );
  router.put(
    "/transaction/:id",
    // validation,
    expressJsonRouteAdapter(makeUpdateTransactionController()),
  );
}
