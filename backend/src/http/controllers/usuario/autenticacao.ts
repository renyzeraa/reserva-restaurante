import { authenticateBodySchema } from '@/http/schemas/usuario-schemas'
import { getMessageError } from '@/services/errors/handleMessageError'
import { makeAuthenticatedUseCase } from '@/services/factories/usuario/make-autenticacao-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const { email, senha } = authenticateBodySchema.parse(request.body)

  try {
    const authenticatedUseCase = makeAuthenticatedUseCase()
    const { usuario } = await authenticatedUseCase.execute({ email, senha })
    const token = await reply.jwtSign({
      tipo: usuario.tipo
    }, {
      sign: {
        sub: usuario.id
      }
    })
    const refreshToken = await reply.jwtSign({
      tipo: usuario.tipo
    }, {
      sign: {
        sub: usuario.id,
        expiresIn: '1d'
      }
    })

    return reply.setCookie('refreshToken', refreshToken, {
      path: '/',
      sameSite: false,
      secure: true,
      httpOnly: true
    }).status(200).send({
      user: {
        ...usuario,
        senha: undefined,
        id: undefined,
        tipo: undefined,
        admin: usuario.tipo === 'ADMINISTRADOR' ? true : false
      },
      token
    })
  }
  catch (error: Error | unknown) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message
    })
  }
}