import { getMessageError } from '@/services/errors/handleMessageError'
import { getIndexMesaUseCase } from '@/services/factories/mesa/get-index-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

/**
 * Retorna todos os mesas
 * @param request 
 * @param reply 
 * @returns 
 */
export async function index(request: FastifyRequest, reply: FastifyReply) {
  try {
    const indexUseCase = getIndexMesaUseCase();
    const { mesas } = await indexUseCase.execute()
    return reply.status(200).send({
      ...mesas
    })
  }
  catch (error: Error | unknown) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message
    })
  }
}