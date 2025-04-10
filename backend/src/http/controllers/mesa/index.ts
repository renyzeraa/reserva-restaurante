import { reservaDateOptionalSchema } from '@/http/schemas/reserva-schemas';
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
  let date;
  if (request.body && typeof request.body === 'object' && 'date' in request.body) {
    date = reservaDateOptionalSchema.parse(request.body).date
  }

  try {
    const indexUseCase = getIndexMesaUseCase();
    const { mesas } = await indexUseCase.execute({ date })
    return reply.status(200).send({
      data: [...mesas],
    })
  }
  catch (error: Error | unknown) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message
    })
  }
}