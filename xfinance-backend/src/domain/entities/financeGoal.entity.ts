export type FinanceGoal = {
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
