import { FastifyReply, FastifyRequest } from 'fastify'

export function verificaTipoUsuarioLogado(checkTipo: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { tipo } = request.user

    if (checkTipo !== tipo) {
      return reply.status(401).send({ message: 'Você não tem permissão !' })
    }
  }
}