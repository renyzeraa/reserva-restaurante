import { userJwt } from "@/http/schemas/usuario-schemas";
import { getMessageError } from "@/services/errors/handleMessageError";
import { getShowReservaForUserUseCase } from "@/services/factories/reserva/get-show-for-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function forUser(request: FastifyRequest, reply: FastifyReply) {
  const { sub: usuario_id } = userJwt.parse(request.user);

  try {
    const showForUserReservaUseCase = getShowReservaForUserUseCase();
    const { reservas } = await showForUserReservaUseCase.execute({ usuario_id });
    return reply.status(200).send({ reservas });
  }
  catch (error: Error | unknown) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message
    })
  }
}
