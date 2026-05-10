export const goalKeys = {
  all: ["goals"] as const,
  list: (filters?: Record<string, unknown>) =>
    ["goals", "list", filters ?? {}] as const,
  detail: (id: string) => ["goal", "detail", id] as const,
};
