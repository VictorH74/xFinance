import { Router } from "express";
import { expressJsonRouteAdapter } from "../adapters/express-route-adapter";
import { makeListTransactionController } from "../factories/controllers/transaction/makeListTransactionController";
import { makeCreateTransactionController } from "../factories/controllers/transaction/makeCreateTransactionController";
import { makeRemoveTransactionController } from "../factories/controllers/transaction/makeRemoveTransactionController";
import { makeUpdateTransactionController } from "../factories/controllers/transaction/makeUpdateTransactionController";
import { validate } from "../middlewares/validate";
import { createTransactionDataSchema } from "@/infra/http/validations/transaction/createTransaction.validation";
import { authValidation } from "../middlewares/authValidation";

export default function transactionRoutes(router: Router) {
  router.get(
    "/transaction/by-user/:userId",
    authValidation,
    expressJsonRouteAdapter(makeListTransactionController()),
  );
  router.post(
    "/transaction",
    authValidation,
    validate(createTransactionDataSchema, 'INVALID_DATA'),
    expressJsonRouteAdapter(makeCreateTransactionController()),
  );
  router.delete(
    "/transaction/:id",
    authValidation,
    expressJsonRouteAdapter(makeRemoveTransactionController()),
  );
  router.put(
    "/transaction/:id",
    authValidation,
    expressJsonRouteAdapter(makeUpdateTransactionController()),
  );
}
