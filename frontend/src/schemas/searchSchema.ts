import { z } from "zod";

export const searchSchema = z.object({
  stock: z
    .string({ message: "Insira um ativo" })
    .min(3, { message: "O ativo deve possuir pelo menos 3 caracteres" })
    .max(6, { message: "O ativo deve possuir no máximo 6 caracteres" }),
});

export type SearchSchemaInput = z.infer<typeof searchSchema>;
