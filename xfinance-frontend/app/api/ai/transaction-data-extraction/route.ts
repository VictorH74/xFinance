const prompt = `
Você é um sistema de extração de transações financeiras a partir de linguagem natural.

Sua tarefa é analisar o texto do usuário e extrair UMA OU MAIS transações financeiras.

---

## 📦 FORMATO DE RESPOSTA

Você deve SEMPRE retornar um JSON válido com o seguinte formato:

{
  "transactions": [
    {
      "amount": number,
      "categoryId": "id",
      "date": "YYYY-MM-DDT00:00:00Z",
      "type": "expense" | "income",
      "description": string
    }
  ],
  "errors": [
    {
      "message": string,
      "type": "INSUFFICIENT_DATA" | "AMBIGUOUS" | "PARSING_ERROR"
    }
  ]
}

- "transactions" pode ser vazio se nada válido for encontrado
- "errors" pode ser vazio se tudo estiver correto
- NUNCA retorne texto fora do JSON

---

## 📌 REGRAS DE EXTRAÇÃO

1. Separe múltiplas transações (ex: "e", ",", "depois", etc.)
2. Cada transação deve gerar um objeto no array "transactions"

---

## 💰 REGRAS DE VALOR

- Extraia apenas números (ex: 45, 100.50)
- Ignore símbolos como "R$", "reais"
- Se não houver valor claro → gerar erro

---

## 📅 REGRAS DE DATA

- Converta datas relativas:
  - hoje → data atual
  - ontem → data atual - 1 dia
- Sempre retornar no formato ISO UTC "YYYY-MM-DDT00:00:00Z"
- Se não houver data → assumir "hoje"
- Se ambíguo → erro

---

## 🔁 REGRAS DE TIPO

- expense → gastos ("gastei", "paguei", "comprei")
- income → ganhos ("recebi", "ganhei", "salário")

---

## 🧾 DESCRIÇÃO

- Gere uma descrição curta e clara
- Ex: "almoço no restaurante", "corrida de uber"

---

## 🗂️ CATEGORIAS DISPONÍVEIS

f1111111-1111-4111-8111-111111111111 > Lucro  
f2222222-2222-4222-8222-222222222222 > Moradia  
f3333333-3333-4333-8333-333333333333 > Alimentação  
f6666666-6666-4666-8666-666666666666 > Compras  
f9999999-9999-4999-8999-999999999999 > Transporte  

- Escolha a categoria mais adequada
- Se não tiver certeza → usar o valor null

---

## ❌ REGRAS DE ERRO

Adicione erros em "errors" quando:

- Não encontrar valor → INSUFFICIENT_DATA
- Texto ambíguo → AMBIGUOUS
- Não conseguir interpretar → PARSING_ERROR

---

## 📆 CONTEXTO

Hoje é: {{CURRENT_DATE}}

---

## 🧪 EXEMPLO

Entrada:
"gastei 45 reais no almoço hoje no restaurante e 100 em uber e 75 reais com assinatura da netlix ontem"

Saída:
{
  "transactions": [
    {
      "amount": 45,
      "categoryId": "f1111111-1111-4111-8111-111111111111", // Alimentação
      "date": "23/04/2026",
      "type": "expense",
      "description": "almoço no restaurante"
    },
    {
      "amount": 100,
      "categoryId": "f2222222-2222-4222-8222-222222222222", // Transporte
      "date": "22/04/2026",
      "type": "expense",
      "description": "corrida de uber"
    },
    {
      "amount": 75,
      "categoryId": null
      "date": "22/04/2026",
      "type": "expense",
      "description": "Assinatura da Netflix"
    }
  ],
  "errors": []
}

---

## 🔎 TEXTO DO USUÁRIO

"{{USER_INPUT}}"
`;

import { generateContent } from "@/lib/gemini-ai";
import { z } from "zod";

const transactionExtractionSchema = z.strictObject({
  transactions: z.array(
    z.strictObject({
      amount: z.number(),
      categoryId: z.string().nullable(),
      date: z.string(),
      type: z.enum(["expense", "income"]),
      description: z.string(),
    }),
  ),
  errors: z.array(
    z.strictObject({
      message: z.string(),
      type: z.enum(["INSUFFICIENT_DATA", "AMBIGUOUS", "PARSING_ERROR"]),
    }),
  ),
});

export async function POST(req: Request) {
  const formData = await req.formData();

  const userInput = formData.get("userInput")?.toString() ?? "";
  const currentDate = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
  const promptText = prompt
    .replace("{{CURRENT_DATE}}", currentDate)
    .replace("{{USER_INPUT}}", userInput);

  try {
    const result = await generateWithRetry(promptText);

    let parsedResult: unknown;

    try {
      parsedResult = JSON.parse(result.text!);
    } catch {
      return Response.json(
        {
          transactions: [],
          errors: [
            {
              message: "Invalid JSON returned by AI model",
              type: "PARSING_ERROR",
            },
          ],
        },
        { status: 500 },
      );
    }

    const validatedResult = transactionExtractionSchema.safeParse(parsedResult);

    if (!validatedResult.success) {
      return Response.json(
        {
          transactions: [],
          errors: [
            {
              message:
                "Invalid transaction extraction payload returned by AI model",
              type: "PARSING_ERROR",
            },
          ],
        },
        { status: 500 },
      );
    }

    console.log(validatedResult.data);

    return Response.json(validatedResult.data);
  } catch (err) {
    const { isUnavailable, message, status } = getErrorInfo(err);

  return Response.json(
    {
      transactions: [],
      errors: [
        {
          message: isUnavailable
            ? "O provedor de IA está temporariamente indisponível. Tente novamente em instantes."
            : "Falha ao processar a extração.",
          type: "PARSING_ERROR",
        },
      ],
      meta: {
        retryable: isUnavailable,
      },
    },
    { status },
  );
  }
}

function getErrorInfo(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const isUnavailable =
    message.includes('"code":503') || message.includes('"status":"UNAVAILABLE"');

  return {
    isUnavailable,
    message,
    status: isUnavailable ? 503 : 500,
  };
}

async function generateWithRetry(promptText: string, attempts = 3) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await generateContent(promptText);
    } catch (error) {
      lastError = error;
      const { isUnavailable } = getErrorInfo(error);

      if (!isUnavailable || attempt === attempts) {
        throw error;
      }

      const delayMs = 500 * 2 ** (attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw lastError;
}