import { Router } from "express";
import { expressJsonRouteAdapter } from "../adapters/express-route-adapter";
import { makeCreateUserController } from "../factories/controllers/user/makeCreateUserController";
import { makeRemoveUserController } from "../factories/controllers/user/makeRemoveUserController";
import { makeUpdateUserController } from "../factories/controllers/user/makeUpdateUserController";
import { authValidation } from "../middlewares/authValidation";

// TODO: implement validations
export default function userRoutes(router: Router) {
  // TODO: remove
  // router.post(
  //   "/users",
  //   // validate,
  //   expressJsonRouteAdapter(makeCreateUserController()),
  // );
  router.delete(
    "/users/:userId",
    authValidation,
    expressJsonRouteAdapter(makeRemoveUserController()),
  );
  router.put(
    "/users/:userId",
    authValidation,
    expressJsonRouteAdapter(makeUpdateUserController()),
  );
}
