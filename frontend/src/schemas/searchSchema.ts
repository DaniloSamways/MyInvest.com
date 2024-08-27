import { z } from "zod";

export const searchSchema = z.object({
  stock: z
    .string({ message: "Insira um ativo" })
    .min(3, { message: "O ativo deve possuir pelo menos 3 caracteres" })
    .max(100, { message: "O ativo deve possuir no máximo 100 caracteres" }),
});

export type SearchSchemaInput = z.infer<typeof searchSchema>;
