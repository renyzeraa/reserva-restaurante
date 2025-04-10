import { reservaSchema } from "@/http/schemas/reserva-schemas";
import { userJwt } from "@/http/schemas/usuario-schemas";
import { getMessageError } from "@/services/errors/handleMessageError";
import { makeCreateReservaUseCase } from "@/services/factories/reserva/make-create-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { sub: usuario_id } = userJwt.parse(request.user);
  const { mesa_id, data_reserva } = reservaSchema.parse(request.body);

  try {
    const createUseCase = makeCreateReservaUseCase();
    const { reserva } = await createUseCase.execute({ usuario_id, mesa_id, data_reserva });
    return reply.status(201).send({ message: "Reserva criada com sucesso!" });
  }
  catch (error: Error | unknown) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message
    })
  }
}
