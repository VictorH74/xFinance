import { DashboardFilters } from "./dashboard.types";

type SearchParamsLike = {
  get: (key: string) => string | null;
  getAll: (key: string) => string[];
};

export const DASHBOARD_FILTERS_STORAGE_KEY = "dashboard-filters";

export const getDateRangeByPeriod = (
  period: "30d" | "60d" | "90d",
): [string, string] => {
  const now = new Date();

  const daysMap = {
    "30d": 30,
    "60d": 60,
    "90d": 90,
  } as const;

  const minDate = new Date(now);
  minDate.setDate(now.getDate() - daysMap[period]);

  const format = (date: Date) => date.toISOString().split("T")[0];

  return [format(minDate), format(now)];
};

export const dateRangePresetList = [
  {
    label: "30d",
    range: getDateRangeByPeriod("30d"),
  },
  {
    label: "60d",
    range: getDateRangeByPeriod("60d"),
  },
  {
    label: "90d",
    range: getDateRangeByPeriod("90d"),
  },
] as const;

export const getDashboardFiltersFromSearchParams = (
  searchParams: SearchParamsLike,
): DashboardFilters => {
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const categoryIds = searchParams.getAll("categoryIds");
  const transactionType = searchParams.get("transactionType");

  return {
    ...(startDate && endDate ? { startDate, endDate } : {}),
    ...(categoryIds.length > 0 ? { categoryIds } : {}),
    ...(transactionType ? { transactionType } : {}),
  };
};

export const saveDashboardFilters = (filters: DashboardFilters) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    DASHBOARD_FILTERS_STORAGE_KEY,
    JSON.stringify(filters),
  );
};

export const loadDashboardFilters = (): DashboardFilters => {
  if (typeof window === "undefined") return {};

  const raw = window.localStorage.getItem(DASHBOARD_FILTERS_STORAGE_KEY);

  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as Partial<DashboardFilters>;

    return {
      ...(parsed.startDate && parsed.endDate
        ? {
            startDate: parsed.startDate,
            endDate: parsed.endDate,
          }
        : {}),
      ...(Array.isArray(parsed.categoryIds) && parsed.categoryIds.length > 0
        ? {
            categoryIds: parsed.categoryIds.filter(
              (value): value is string => typeof value === "string",
            ),
          }
        : {}),
      ...(typeof parsed.transactionType === "string"
        ? { transactionType: parsed.transactionType }
        : {}),
    };
  } catch {
    return {};
  }
};
