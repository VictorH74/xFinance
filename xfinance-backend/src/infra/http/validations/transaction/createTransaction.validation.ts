import z from "zod";

const transactionTypeSchema = z.enum(["income", "expense"], {
  error: (iss) =>
    iss.input === undefined ? "'type' is required" : "'type' is invalid",
});

const transactionSourceSchema = z.enum(
  ["manual", "ai_text", "csv_import", "ofx_import"],
  {
    error: (iss) =>
      iss.input === undefined ? "'source' is required" : "'source' is invalid",
  },
);

export const createTransactionDataSchema = z.object({
  body: z.array(
    z.object({
      categoryId: z
        .uuid({
          error: "'categoryId' is invalid",
        })
        .nullable(),
      amount: z.number({
        error: (iss) =>
          iss.input === undefined
            ? "'amount' is required"
            : "'amount' is not a number",
      }),
      description: z.string({ error: "'description' is invalid" }).optional(),
      type: transactionTypeSchema,
      // TODO: validate ISO UTC date
      date: z.string({
        error: (iss) =>
          iss.input === undefined ? "'date' is required" : "'date' is invalid",
      }),
      source: transactionSourceSchema,
      aiRawText: z
        .string({
          error: "'aiRawText' is invalid",
        })
        .nullable()
        .optional(),
      importBatchId: z
        .string({
          error: "'importBatchId' is invalid",
        })
        .nullable()
        .optional(),
    }),
  ),
});
