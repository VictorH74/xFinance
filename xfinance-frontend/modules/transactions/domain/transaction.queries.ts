"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransactions, deleteTransaction, listTransactions, updateTransaction } from "./transaction.service";
import { transactionKeys } from "./transaction.keys";
import { CreateTransactionsPayload } from "./transaction.types";

export function useTransactions(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: transactionKeys.list(filters),
    queryFn: () => listTransactions(filters),
  });
}

export function useCreateTransactions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionKeys.all,
      });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionKeys.all,
      });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionKeys.all,
      });
    },
  });
}
