import z from "zod";

export const refreshDataSchema = z.object({
  body: z.object({
    refreshToken: z.string({
      error: (iss) =>
        iss.input === undefined
          ? "'refreshToken' is required"
          : "'refreshToken' is invalid",
    }),
  }),
});
