import { getMessageError } from "@/services/errors/handleMessageError";
import { getIndexReservaUseCase } from "@/services/factories/reserva/get-index-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function index(request: FastifyRequest, reply: FastifyReply) {
  try {
    const indexReservaUseCase = getIndexReservaUseCase();
    const { reservas } = await indexReservaUseCase.execute();
    return reply.status(200).send({ data: [...reservas] });
  }
  catch (error: Error | unknown) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message
    })
  }
}
