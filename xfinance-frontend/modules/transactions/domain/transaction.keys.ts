export const transactionKeys = {
  all: ["transactions"] as const,
  list: (filters?: Record<string, unknown>) =>
    ["transactions", "list", filters ?? {}] as const,
  detail: (id: string) => ["transactions", "detail", id] as const,
};
