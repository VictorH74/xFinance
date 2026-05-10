import { Category } from "../../categories/domain/category.types";

export type Goal = {
  id: string;
  userId: string;
  categoryId: string | null;
  amountLimit: number;
  periodMonth: number;
  periodYear: number;
  isRecurring: boolean;
  notificationAt: number;
  createdAt: Date;
};

export type ListableGoal = Omit<Goal, "userId" | "categoryId" | "createdAt"> & {
  category: Pick<Category, "name" | "color" | "emoji" | "localizedName">;
  currentValue: number;
};

export type CreateGoalPayload = Pick<
  Goal,
  | "categoryId"
  | "amountLimit"
  | "periodYear"
  | "periodMonth"
  | "notificationAt"
  | "isRecurring"
>;

export type UpdateGoalPayload = Pick<
  Goal,
  | "id"
  | "categoryId"
  | "amountLimit"
  | "periodYear"
  | "periodMonth"
  | "notificationAt"
  | "isRecurring"
>;
