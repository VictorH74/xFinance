import { Transaction } from "@/domain/entities/transaction";
import { UseCase } from "../UseCase";
import { Category } from "@prisma-generated/prisma/browser";

export interface GetDashboardDataUseCaseI extends UseCase<
  GetDashboardDataUseCaseI.Request,
  GetDashboardDataUseCaseI.Response
> {
  execute(
    data: GetDashboardDataUseCaseI.Request,
  ): Promise<GetDashboardDataUseCaseI.Response>;
}

export namespace GetDashboardDataUseCaseI {
  GetDashboardDataUseCaseI;
  export type Request = (
    | {
        categoryIds?: string[];
        transactionType?: string;
      }
    | {
        minDate: string;
        maxDate: string;
        categoryIds?: string[];
        transactionType?: string;
      }
  ) & { userId: string };
  export type Response = {
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
      // categoryId: string;
      name: string;
      emoji: string;
      color: string;
      total: number;
      percentage: number;
    }[];
    recentTransactions: (Omit<
      Transaction,
      | "userId"
      | "categoryId"
      | "source"
      | "aiRawText"
      | "importBatchId"
      | "createdAt"
      | "date"
    > & {
      date: string;
      category: Pick<Category, "color" | "emoji" | "name"> | null;
    })[];
  };
}
