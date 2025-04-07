import { FastifyReply, FastifyRequest } from "fastify";

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  }
  catch (err) {
    reply.status(401).send({ message: "Acesso não autorizado!" })
  }
}