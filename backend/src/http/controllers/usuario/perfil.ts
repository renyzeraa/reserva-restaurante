import { perfilUsuario } from "@/services/factories/usuario/perfil-usuario";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getPerfilUsuario = perfilUsuario()
  const { usuario } = await getPerfilUsuario.execute({
    id: request.user.sub,
  })
  return reply.status(200).send({ ...usuario, senha: undefined })
}
