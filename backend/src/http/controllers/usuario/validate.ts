import { validateToken } from '@/http/middlewares/validate-token';
import { getMessageError } from '@/services/errors/handleMessageError';
import { FastifyReply, FastifyRequest } from 'fastify'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await validateToken(request);
    // Token válido, retorna sucesso
    return reply.status(200).send({ valid: true });
  } catch (error) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message,
      valid: false
    })
  }
}
