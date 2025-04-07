import { checkReservaId } from "@/http/schemas/reserva-schemas";
import { getMessageError } from "@/services/errors/handleMessageError";
import { getShowReservaUseCase } from "@/services/factories/reserva/get-show-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function show(request: FastifyRequest, reply: FastifyReply) {
  const { id } = checkReservaId.parse(request.params);

  try {
    const showReservaUseCase = getShowReservaUseCase();
    const { reserva } = await showReservaUseCase.execute({ id });
    return reply.status(200).send({ reserva });
  }
  catch (error: Error | unknown) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message
    })
  }
}
