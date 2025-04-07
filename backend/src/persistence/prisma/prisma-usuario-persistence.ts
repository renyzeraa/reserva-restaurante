import { prisma } from '@/lib/prisma'
import { Prisma, Usuario } from '@prisma/client'
import { UsuarioPersistencia } from '../usuario-persistence'

export class PrismaUsuarioPersistence implements UsuarioPersistencia {
  async findById(id: string): Promise<Usuario | null> {
    const user = await prisma.usuario.findFirst({
      where: {
        id
      }
    })
    return user
  }

  async create(data: Prisma.UsuarioCreateInput) {
    const user = await prisma.usuario.create({
      data,
    })
    return user
  }

  async update(id: string, data: Prisma.UsuarioUpdateInput) {
    const usuario = await prisma.usuario.update({
      where: {
        id,
      },
      data
    })
    return usuario
  }

  async findByEmail(email: string) {
    const user = await prisma.usuario.findUnique({
      where: {
        email,
      },
    })
    return user
  }
}
