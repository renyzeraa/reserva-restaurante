import { updateReservaSchema } from "@/http/schemas/reserva-schemas";
import { userJwt } from "@/http/schemas/usuario-schemas";
import { getMessageError } from "@/services/errors/handleMessageError";
import { makeUpdateReservaUseCase } from "@/services/factories/reserva/make-update-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { sub: usuario_id } = userJwt.parse(request.user);
  const { data_reserva, id, mesa_id, status } = updateReservaSchema.parse(request.body);

  try {
    const createUseCase = makeUpdateReservaUseCase();
    const { reserva } = await createUseCase.execute({ usuario_id, data_reserva, id, mesa_id, status });
    return reply.status(200).send({ message: "Reserva atualizada com sucesso !", reserva });
  }
  catch (error: Error | unknown) {
    const instanceError = getMessageError(error);
    return reply.status(instanceError.statusCode).send({
      message: instanceError.message
    })
  }
}
