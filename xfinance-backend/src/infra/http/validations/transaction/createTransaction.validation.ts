import z from "zod";

export const createTransactionDataSchema = z.object({
  body: z.object({
    userId: z.uuid({
      error: (iss) =>
        iss.input === undefined
          ? "'userId' is required"
          : "'userId' is invalid",
    }),
    categoryId: z.uuid({
      error: (iss) =>
        iss.input === undefined
          ? "'userId' is required"
          : "'categoryId' is required",
    }),
    amount: z.number({
      error: (iss) => (iss.input === undefined ? "'amount' is required" : "'amount' is not a number"),
    }),
    description: z.string({ error: "'description' is invalid" }).optional(),
    date: z.date({
      error: (iss) => (iss.input === undefined ? "'date' is required" : "'date' has a invalid format"),
    }),
    source: z.string({
      error: (iss) => (iss.input === undefined ? "'source' is required" : "'source' is invalid"),
    }),
    aiRawText: z.string({
      error: "'aiRawText' is invalid",
    }).optional(),
    importBatchId: z.string({
      error: "'importBatchId' is invalid",
    }).optional(),
  }),
});
