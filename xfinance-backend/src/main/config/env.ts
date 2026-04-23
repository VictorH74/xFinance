import 'dotenv/config';
import { z } from "zod";

const EnvSchema = z.object({
  GEMINI_API_KEY: z.string({
    error: "Variável de ambiente 'GEMINI_API_KEY' não encontrado!",
  }),
  DB_HOST: z.string({
    error: "Variável de ambiente 'DB_HOST' não encontrado!",
  }),
  DB_NAME: z.string({
    error: "Variável de ambiente 'DB_NAME' não encontrado!",
  }),
  DB_USER: z.string({
    error: "Variável de ambiente 'DB_USER' não encontrado!",
  }),
  DB_PASS: z.string({
    error: "Variável de ambiente 'DB_PASS' não encontrado!",
  }),
  DB_PORT: z.coerce
    .number({
      error: "Variável de ambiente 'DB_PORT' não encontrado!",
    })
    .positive()
    .default(5432),
  BASE_URL: z
    .string({
      error: "Variável de ambiente 'BASE_URL' não encontrado!",
    })
    .url(),
});

export const env = EnvSchema.parse(process.env);
