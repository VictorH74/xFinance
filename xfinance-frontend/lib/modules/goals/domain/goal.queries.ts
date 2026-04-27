"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { goalKeys } from "./goal.keys";
import { createGoal, listGoals } from "./goal.service";


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
