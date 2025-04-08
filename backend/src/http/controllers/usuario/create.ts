import { createUsuarioSchema } from '@/http/schemas/usuario-schemas'
import { getMessageError } from '@/services/errors/handleMessageError'
import { makeCreateUseCase } from '@/services/factories/usuario/make-create-use-case'
import { CONST } from '@/utils/const'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { nome, email, senha } = createUsuarioSchema.parse(request.body)

  try {
    const createUseCase = makeCreateUseCase();
    await createUseCase.execute({ nome, email, senha, tipo: CONST.TIPO_USUARIO.NORMAL })
  }
  catch (error: Error | unknown) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message
    })
  }

  return reply.status(201).send({ message: "Usuário criado com sucesso" })
}