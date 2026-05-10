export const categoryKeys = {
  all: ["categories"] as const,
  list: (filters?: Record<string, unknown>) =>
    ["categories", "list", filters ?? {}] as const,
  detail: (id: string) => ["category", "detail", id] as const,
};
