import { checkMesaId } from '@/http/schemas/mesa-schemas';
import { getMessageError } from '@/services/errors/handleMessageError'
import { getShowMesaUseCase } from '@/services/factories/mesa/get-show-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

/**
 * Retorna somente um mesa
 * @param request 
 * @param reply 
 * @returns 
 */
export async function show(request: FastifyRequest, reply: FastifyReply) {
  const { id } = checkMesaId.parse(request.params)

  try {
    const showUseCase = getShowMesaUseCase();
    const { mesa } = await showUseCase.execute({ id })
    return reply.status(200).send({
      ...mesa
    })
  }
  catch (error: Error | unknown) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message
    })
  }
}