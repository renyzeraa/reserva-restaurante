import { create } from "../controllers/reserva/create"
import { verifyJwt } from "../middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { update } from "../controllers/reserva/update"
import { show } from "../controllers/reserva/show"
import { index } from "../controllers/reserva/index"
import { forUser } from "../controllers/reserva/for-user"

export async function reservaRoutes(app: FastifyInstance) {
  app.get('/api/v1/reserva/:reserva_id', show)
  app.get('/api/v1/reserva/', index)
  app.get('/api/v1/reserva/forUser', { onRequest: [verifyJwt] }, forUser)

  /* autenticado */
  app.post('/api/v1/reserva', { onRequest: [verifyJwt] }, create)
  app.put('/api/v1/reserva', { onRequest: [verifyJwt] }, update)
}