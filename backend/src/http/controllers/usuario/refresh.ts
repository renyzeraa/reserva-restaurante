import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign(
    {
      tipo: request.user.tipo
    },
    {
      sign: {
        sub: request.user.sub
      }
    })
  const refreshToken = await reply.jwtSign(
    {
      tipo: request.user.tipo
    },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '1d'
      }
    })

  return reply.setCookie('refreshToken', refreshToken, {
    path: '/',
    sameSite: true,
    secure: true,
    httpOnly: true
  }).status(200).send({ token })
}
