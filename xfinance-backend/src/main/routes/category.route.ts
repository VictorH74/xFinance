import { Router } from "express";
import { expressJsonRouteAdapter } from "../adapters/express-route-adapter";
import { makeListCategoryController } from "../factories/controllers/category/makeListCategoryController";
import { makeCreateCategoryController } from "../factories/controllers/category/makeCreateCategoryController";
import { makeRemoveCategoryController } from "../factories/controllers/category/makeRemoveCategoryController";
import { makeUpdateCategoryController } from "../factories/controllers/category/makeUpdateCategoryController";
import { authValidation } from "../middlewares/authValidation";
import { validate } from "../middlewares/validate";
import { createCategoryDataSchema } from "@/infra/http/validations/category/createCategory.validation";

// TODO: implement validations
export default function categoryRoutes(router: Router) {
  router.get(
    "/category",
    authValidation,
    expressJsonRouteAdapter(makeListCategoryController()),
  );
  router.post(
    "/category",
    authValidation,
    validate(createCategoryDataSchema, "INVALID_DATA"),
    expressJsonRouteAdapter(makeCreateCategoryController()),
  );
  router.delete(
    "/category/:id",
    authValidation,
    expressJsonRouteAdapter(makeRemoveCategoryController()),
  );
  router.put(
    "/category/:id",
    authValidation,
    expressJsonRouteAdapter(makeUpdateCategoryController()),
  );
}
