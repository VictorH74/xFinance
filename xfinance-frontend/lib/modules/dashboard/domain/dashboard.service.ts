import { api } from "@/lib/http/api-client";
import { DashboardFilters, GetDashboarDataResponseT } from "./dashboard.types";

export const getDashboardData = async (
  filters?: DashboardFilters,
): Promise<GetDashboarDataResponseT> => {
  const { data } = await api.get<GetDashboarDataResponseT>("/dashboard", {
    params: filters,
  });

  console.log(data)

  return data;
};
