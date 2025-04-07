import { prisma } from '@/lib/prisma'
import { Prisma, Mesa } from '@prisma/client'
import { MesaPersistencia } from '../mesa-persistence'

export class PrismaMesaPersistence implements MesaPersistencia {
  async findById(id: string): Promise<Mesa | null> {
    const mesa = await prisma.mesa.findFirst({
      where: {
        id
      }
    })
    return mesa
  }

  async create(data: Prisma.MesaCreateInput) {
    const mesa = await prisma.mesa.create({
      data,
    })
    return mesa
  }

  async update(id: string, data: Prisma.MesaUpdateInput) {
    const mesa = await prisma.mesa.update({
      where: {
        id,
      },
      data
    })
    return mesa
  }

  async getAll(): Promise<Mesa[]> {
    const mesas = await prisma.mesa.findMany({
      orderBy: { nome: 'asc' }
    })
    return mesas
  }
}
