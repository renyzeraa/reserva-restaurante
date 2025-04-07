import { z } from "zod";

export const checkMesaId = z.object({
  id: z.string().uuid()
})

const commonFields = {
  nome: z.string().min(1, "Nome é obrigatório"),
}

export const createMesaSchema = z.object({
  ...commonFields,
})

export const updateMesaSchema = z.object({
  ...commonFields,
  id: z.string().uuid()
})