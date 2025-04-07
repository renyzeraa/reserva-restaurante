import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { allRoutes } from '@/http/routes/index'
import { ZodError } from 'zod'
import { env } from './env'
import { fastifyJwt } from '@fastify/jwt'
import fastifyCors from '@fastify/cors'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env!.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '1d',
  },
})
app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})
app.register(fastifyCookie)
app.register(allRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    const formattedErrors: any = {
      message: "Erro de validação do Zod.",
      errors: error.errors.map(err => ({
        campo: err.path.join('.'),
        message: err.message
      }))
    };

    return reply
      .status(400)
      .send(formattedErrors)
  }

  if (env!.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // melhorar o trace, data, tipo de erro
  }

  // Erro genérico
  return reply.status(500).send({
    message: 'Erro interno no servidor',
    error: env?.NODE_ENV !== 'production' ? error.message : undefined,
    stack: env?.NODE_ENV !== 'production' ? error.stack : undefined
  })
})