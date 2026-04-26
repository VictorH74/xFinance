import { GetDashboardDataUseCaseI } from "@/application/interfaces/use-cases/dashboard/GetDashboardDataUseCase";
import { GetDashboardDataUseCaseImpl } from "@/application/use-cases/dashboard/GetDashboardDataUseCaseImpl";

export const makeGetDashboardDataUseCase = (): GetDashboardDataUseCaseI => {
    return new GetDashboardDataUseCaseImpl()
};