import { reservaDateSchema } from "@/http/schemas/reserva-schemas";
import { getMessageError } from "@/services/errors/handleMessageError";
import { getReservaForDateUseCase } from "@/services/factories/reserva/get-reserva-for-date-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function forDate(request: FastifyRequest, reply: FastifyReply) {
  const { data } = reservaDateSchema.parse(request.params);

  try {
    const reservaForDateUseCase = getReservaForDateUseCase();
    const { reservas } = await reservaForDateUseCase.execute({ data });
    return reply.status(200).send({ reservas })
  }
  catch (error: Error | unknown) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message
    })
  }
}
