import { updateUsuarioSchema, userJwt } from '@/http/schemas/usuario-schemas'
import { getMessageError } from '@/services/errors/handleMessageError'
import { makeUpdateUseCase } from '@/services/factories/usuario/make-update-usuario'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { sub: id } = userJwt.parse(request.user)
  const { nome, email, senha, tipo, senha_old } = updateUsuarioSchema.parse(request.body)

  try {
    const registerUseCase = makeUpdateUseCase();
    await registerUseCase.execute({ id, nome, email, senha, senha_old, tipo })
  }
  catch (error: Error | unknown) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message
    })
  }

  return reply.status(200).send({ message: "Usuário atualizado com sucesso" })
}