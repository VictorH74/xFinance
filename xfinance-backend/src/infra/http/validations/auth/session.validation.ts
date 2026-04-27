import z from "zod";

// TODO: fix - authorization validation not working
export const sessionDataSchema = z.object({
  headers: z.object({
    authorization: z.string({
      error: (iss) =>
        iss.input === undefined
          ? "'authorization' is required"
          : "'authorization' is invalid",
    }),
  }),
});
