import z from "zod";

export const createFinanceGoalDataSchema = z.object({
  body: z.object({
    categoryId: z.uuid({ error: "'categoryId' is invalid" }).optional(),
    amountLimit: z.number({
      error: (iss) =>
        iss === undefined
          ? "'amountLimit' is required"
          : "'amountLimit' is invalid",
    }),
    periodMonth: z.number({
      error: (iss) =>
        iss === undefined
          ? "'periodMonth' is required"
          : "'periodMonth' is invalid",
    }),
    periodYear: z.number({
      error: (iss) =>
        iss === undefined
          ? "'periodYear' is required"
          : "'periodYear' is invalid",
    }),
    isRecurring: z.boolean({
      error: (iss) =>
        iss === undefined
          ? "'isRecurring' is required"
          : "'isRecurring' is invalid",
    }),
    notificationAt: z.number({
      error: (iss) =>
        iss === undefined
          ? "'notificationAt' is required"
          : "'notificationAt' is invalid",
    }),
  }),
});
