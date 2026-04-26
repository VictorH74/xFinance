import z from "zod";

export const registerDataSchema = z.object({
  body: z.object({
    email: z.email({
      error: (iss) =>
        iss.input === undefined ? "'email' is required" : "'email' is invalid",
    }),
    password: z.string({
      error: (iss) =>
        iss.input === undefined
          ? "'password' is required"
          : "'password' is invalid",
    }),
    name: z
      .string({
        error: (iss) =>
          iss.input === undefined ? "'name' is required" : "'name' is invalid",
      })
      .max(50, { error: "name is larger" })
      .min(3, { error: "name is smaller" }),
  }),
});
