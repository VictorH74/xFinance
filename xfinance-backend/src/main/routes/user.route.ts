import { Router } from "express";
import { expressJsonRouteAdapter } from "../adapters/express-route-adapter";
import { makeCreateUserController } from "../factories/controllers/user/makeCreateUserController";
import { makeRemoveUserController } from "../factories/controllers/user/makeRemoveUserController";
import { makeUpdateUserController } from "../factories/controllers/user/makeUpdateUserController";

// TODO: implement validations
export default function userRoutes(router: Router) {
  router.post(
    "users",
    // validation,
    expressJsonRouteAdapter(makeCreateUserController()),
  );
  router.delete(
    "users/:userId",
    // validation,
    expressJsonRouteAdapter(makeRemoveUserController()),
  );
  router.put(
    "users/:userId",
    // validation,
    expressJsonRouteAdapter(makeUpdateUserController()),
  );
}
