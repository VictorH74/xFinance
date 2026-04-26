import z from "zod";

export const loginDataSchema = z.object({
  body: z.object({
    email: z.email({
      error: (iss) =>
        iss.input === undefined
          ? "'email' is required"
          : "'email' is invalid",
    }),
    password: z.string({
      error: (iss) =>
        iss.input === undefined
          ? "'password' is required"
          : "'password' is invalid",
    }),
  }),
});
