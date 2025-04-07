import { createMesaSchema } from '@/http/schemas/mesa-schemas'
import { getMessageError } from '@/services/errors/handleMessageError'
import { makeCreateMesaUseCase } from '@/services/factories/mesa/make-create-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { nome } = createMesaSchema.parse(request.body)

  try {
    const createUseCase = makeCreateMesaUseCase();
    await createUseCase.execute({ nome })
  }
  catch (error: Error | unknown) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message
    })
  }

  return reply.status(201).send({ message: "Mesa criado com sucesso" })
}