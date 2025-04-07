import { FastifyInstance } from 'fastify'
import { create } from '../controllers/usuario/create'
import { authenticate } from '../controllers/usuario/autenticacao'
import { update } from '../controllers/usuario/update'
import { profile } from '../controllers/usuario/perfil'
import { verifyJwt } from '../middlewares/verify-jwt'
import { refresh } from '../controllers/usuario/refresh'
import { verificaTipoUsuarioLogado } from '../middlewares/verify-type-user'
import { CONST } from '@/utils/const'

export async function userRoutes(app: FastifyInstance) {
  app.post('/api/v1/usuario', create)
  /**
   * Usuário e Admin utilizam o mesmo tipo de autenticação
   */
  app.post('/api/v1/login', authenticate)

  app.patch('/api/v1/token/refresh', refresh)

  /** autenticado **/
  app.get('/api/v1/usuario/perfil', { onRequest: [verifyJwt, verificaTipoUsuarioLogado(CONST.TIPO_USUARIO.NORMAL)] }, profile)
  app.put('/api/v1/usuario', { onRequest: [verifyJwt, verificaTipoUsuarioLogado(CONST.TIPO_USUARIO.NORMAL)] }, update)
}