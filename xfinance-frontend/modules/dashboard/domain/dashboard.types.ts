import { Category } from "../../categories/domain/category.types";
import { ListableTransaction, Transaction } from "../../transactions/domain/transaction.types";

export type DashboardFilters =
  | {
      categoryIds?: string[];
      transactionType?: string;
    }
  | {
      startDate: string;
      endDate: string;
      categoryIds?: string[];
      transactionType?: string;
    };

export type GetDashboarDataResponseT = {
  summary: {
    balance: number;
    incomeTotal: number;
    expenseTotal: number;
    savingsRate: number;
  };
  monthlyEvolution: {
    month: string;
    income: number;
    expense: number;
  }[];
  expensesByCategory: {
    name: string;
    localizedName: Category['localizedName'];
    emoji: string;
    color: string;
    categoryId: string;
    total: number;
    percentage: number;
  }[];
  recentTransactions: ListableTransaction[];
};
