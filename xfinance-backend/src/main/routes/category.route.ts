import { Router } from "express";
import { expressJsonRouteAdapter } from "../adapters/express-route-adapter";
import { makeListCategoryController } from "../factories/controllers/category/makeListCategoryController";
import { makeCreateCategoryController } from "../factories/controllers/category/makeCreateCategoryController";
import { makeRemoveCategoryController } from "../factories/controllers/category/makeRemoveCategoryController";
import { makeUpdateCategoryController } from "../factories/controllers/category/makeUpdateCategoryController";

// TODO: implement validations
export default function categoryRoutes(router: Router) {
  router.get(
    "/categories/by-user/:userId",
    // validation,
    expressJsonRouteAdapter(makeListCategoryController()),
  );
  router.post(
    "/categories",
    // validation,
    expressJsonRouteAdapter(makeCreateCategoryController()),
  );
  router.delete(
    "/categories/:id",
    // validation,
    expressJsonRouteAdapter(makeRemoveCategoryController()),
  );
  router.put(
    "/categories/:id",
    // validation,
    expressJsonRouteAdapter(makeUpdateCategoryController()),
  );
}
