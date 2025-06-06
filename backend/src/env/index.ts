import 'dotenv/config'
import { z } from 'zod'
import { InvalidVariables } from '@/services/errors/variables-invalid'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success == false) {
  console.error('Variáveis de ambiente inválidas', _env.error.format())
  throw new InvalidVariables()
}

export const env = _env.data