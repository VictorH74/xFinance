"use server";
import { revalidatePath } from "next/cache";
import { ListableGoal } from "./goal.types";
import { apiFetch } from "@/lib/api";
import { proxyFetch } from "@/lib/server/proxyFetch";

export async function listGoalsAction(
  filters?: Record<string, unknown>,
): Promise<ListableGoal[]> {
  const date = new Date();

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || `https://${process.env.VERCEL_URL}`;

  const res = await fetch(`${baseUrl}/api/proxy/goal?periodMonth=${date.getMonth()}&periodYear=${date.getFullYear()}`, {
    method: "GET",
    // cache: "no-store",
  });

  // const res = await proxyFetch(
  //   `/goal?periodMonth=${date.getMonth()}&periodYear=${date.getFullYear()}`,
  //   {
  //     method: "GET",
  //   },
  // );
  // const res = await fetch(
  //   `/api/proxy/goal?periodMonth=${date.getMonth()}&periodYear=${date.getFullYear()}`,
  //   {
  //     method: "GET",
  //   },
  // );
  // // const res = await apiFetch(
  // //   `/goal?periodMonth=${date.getMonth()}&periodYear=${date.getFullYear()}`,
  // // );

  console.log(res);

  // TODO: handle errors
  if (!res.ok) return [];

  return res.json();
}

export async function deleteGoalAction(id: string) {
  await apiFetch(`/goal/${id}`, { method: "DELETE" });
  revalidatePath("/goals");
}

export async function createGoalAction(formData: FormData) {
  await apiFetch("/goal", {
    method: "POST",
    body: JSON.stringify({
      categoryId: formData.get("categoryId"),
      amountLimit: formData.get("amountLimit"),
      periodMonth: formData.get("periodMonth"),
      periodYear: formData.get("periodYear"),
      isRecurring: formData.get("isRecurring"),
      notificationAt: formData.get("notificationAt"),
    }),
  });
  revalidatePath("/goals");
}
