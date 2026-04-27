import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "./dashboard.keys";
import { DashboardFilters } from "./dashboard.types";
import { getDashboardData } from "./dashboard.service";

export const useDashboardData = (filters?: DashboardFilters) =>
  useQuery({
    queryKey: dashboardKeys.data(filters),
    queryFn: () => getDashboardData(),
  });
