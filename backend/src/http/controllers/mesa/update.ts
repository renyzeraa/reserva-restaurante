import { checkMesaId, updateMesaSchema } from '@/http/schemas/mesa-schemas'
import { userJwt } from '@/http/schemas/usuario-schemas'
import { getMessageError } from '@/services/errors/handleMessageError'
import { makeUpdateMesaUseCase } from '@/services/factories/mesa/make-update-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { sub: usuario_id } = userJwt.parse(request.user)
  const { id } = checkMesaId.parse(request.params)
  const { nome } = updateMesaSchema.parse(request.body)

  try {
    const updateUseCase = makeUpdateMesaUseCase();
    const { mesa } = await updateUseCase.execute({ id, nome, usuario_id })
    return reply.status(200).send({
      message: "Mesa atualizado com sucesso", mesa: {
        ...mesa,
        usuario_id: undefined
      }
    })
  }
  catch (error: Error | unknown) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message
    })
  }
}