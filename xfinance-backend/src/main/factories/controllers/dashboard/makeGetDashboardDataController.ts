import { BaseController } from "@/infra/http/controllers/BaseController";
import { makeGetDashboardDataUseCase } from "../../use-cases/dashboard/makeGetDashboardDataUseCase";
import { GetDashboardDataController } from "@/infra/http/controllers/dashboard/GetDashboardDataController";

export const makeGetDashboardDataController = (): BaseController => {
  const useCase = makeGetDashboardDataUseCase();
  return new GetDashboardDataController(useCase);
};
