export type Category = {
  id: string;
  userId: string;
  name: string;
  emoji: string;
  color: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ListableCategory = Omit<Category, "createdAt" | "updatedAt"> & {
  transactionCount: number;
  hasActiveMeta: boolean;
  currentMonthExpense: number;
};

export type CreateCategoryPayload = Pick<
  Category,
  "name" | "emoji" | "color" | "isDefault"
>;

export type UpdateCategoryPayload = Pick<
  Category,
  "id" | "name" | "emoji" | "color" | "isDefault"
>;
