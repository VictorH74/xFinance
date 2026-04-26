import z from "zod";

export const createCategoryDataSchema = z.object({
  body: z.object({
    userId: z.uuid({
      error: (iss) =>
        iss.input === undefined
          ? "'userId' is required"
          : "'userId' is invalid",
    }),
    name: z
      .string({
        error: (iss) =>
          iss.input === undefined ? "'name' is required" : "'name' is invalid",
      })
      .max(50, { error: "name is larger" })
      .min(3, { error: "names is smaller" }),
    emoji: z
      .string({
        error: (iss) =>
          iss.input === undefined ? "'emoji' is required" : "'emoji' is invalid",
      })
      .max(1, { error: "emoji is larger" })
      .min(1, { error: "emoji is smaller" }),
      // TODO: use regex to match hexadecimal, rgb or hsl type
    color: z
      .string({
        error: (iss) =>
          iss.input === undefined ? "'color' is required" : "'color' is invalid",
      })
      .max(10, { error: "color is larger" })
      .min(4, { error: "color is smaller" }),
    isDefault: z.boolean({
      error: (iss) =>
        iss.input === undefined ? "'isDefault' is required" : "'isDefault' is invalid",
    }),
  }),
});

