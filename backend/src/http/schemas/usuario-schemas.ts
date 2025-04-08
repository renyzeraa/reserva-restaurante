import { CONST } from "@/utils/const";
import { z } from "zod";

export const userJwt = z.object({
  sub: z.string().uuid()
})

export const authenticateBodySchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
})

const commonFields = {
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().nonempty("Senha é obrigatória").min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  tipo: z.enum(["NORMAL"]).refine(value => value === CONST.TIPO_USUARIO.NORMAL, {
    message: "Tipo de Usuário incorreto",
  }).optional(),
}

export const createUsuarioSchema = z.object({
  ...commonFields
})

export const updateUsuarioSchema = z.object({
  ...commonFields,
  senha_old: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
})
