import { FastifyRequest } from "fastify";

export async function validateToken(request: FastifyRequest): Promise<any> {
  try {
    // Extrai o token do cabeçalho Authorization
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Token não fornecido ou formato inválido');
    }
    const decodedToken = await request.jwtVerify();
    return decodedToken;
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
}