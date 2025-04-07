import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt'
import { verificaTipoUsuarioLogado } from '../middlewares/verify-type-user'
import { CONST } from '@/utils/const'
import { create } from '../controllers/mesa/create'
import { update } from '../controllers/mesa/update'
import { show } from '../controllers/mesa/show'
import { index } from '../controllers/mesa'

export async function mesaRoutes(app: FastifyInstance) {
  app.get('/api/v1/mesa', index) // todos
  app.get('/api/v1/mesa/:id', show) // individual

  /** autenticado **/
  app.post('/api/v1/mesa', { onRequest: [verifyJwt, verificaTipoUsuarioLogado(CONST.TIPO_USUARIO.ADMINISTRADOR)] }, create)
  app.put('/api/v1/mesa/:id', { onRequest: [verifyJwt, verificaTipoUsuarioLogado(CONST.TIPO_USUARIO.ADMINISTRADOR)] }, update)
}