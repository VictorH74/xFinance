"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, listCategories } from "./category.service";
import { categoryKeys } from "./category.keys";


export function useCategories(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: categoryKeys.list(filters),
    queryFn: () => listCategories(filters),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });
    },
  });
}
