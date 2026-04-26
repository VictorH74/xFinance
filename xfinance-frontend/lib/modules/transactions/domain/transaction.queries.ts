"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction, listTransactions } from "./transaction.service";
import { transactionKeys } from "./transaction.keys";

export function useTransactions(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: transactionKeys.list(filters),
    queryFn: () => listTransactions(filters),
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionKeys.all,
      });
    },
  });
}
