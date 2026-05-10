export const dashboardKeys = {
  data: (filters?: Record<string, unknown>) =>
    ["dashboard", filters ?? {}] as const,
};