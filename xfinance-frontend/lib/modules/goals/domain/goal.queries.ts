"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { goalKeys } from "./goal.keys";
import { createGoal, deleteGoal, listGoals, updateGoal } from "./goal.service";


export function useGoals(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: goalKeys.list(filters),
    queryFn: () => listGoals(filters),
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: goalKeys.all,
      });
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: goalKeys.all,
      });
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: goalKeys.all,
      });
    },
  });
}
