import { prisma } from '@/lib/prisma'
import { Prisma, Reserva } from '@prisma/client'
import { ReservaPersistencia } from '../reserva-persistence'

export class PrismaReservaPersistence implements ReservaPersistencia {
  async findById(id: string): Promise<Reserva | null> {
    return await prisma.reserva.findFirst({
      where: {
        id
      }
    })
  }

  async create(data: Prisma.ReservaCreateInput) {
    return await prisma.reserva.create({
      data,
    })
  }

  async update(id: string, data: Prisma.ReservaUpdateInput) {
    return await prisma.reserva.update({
      where: {
        id,
      },
      data
    })
  }

  async getAll(): Promise<Reserva[]> {
    return await prisma.reserva.findMany()
  }

  async findByMesaAndDateRange(mesa_id: string, inicio: Date, fim: Date): Promise<Reserva | null> {
    return await prisma.reserva.findFirst({
      where: {
        mesa_id,
        data_reserva: {
          gte: inicio,
          lte: fim
        }
      }
    })
  }

  async findByDate(date: Date): Promise<Reserva[]> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    return await prisma.reserva.findMany({
      where: {
        data_reserva: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  }

  async findByMesaAndDate(mesa_id: string, data_reserva: Date): Promise<Reserva | null> {
    return await prisma.reserva.findFirst({
      where: {
        mesa_id,
        data_reserva
      }
    });
  }

  async getAllForUser(usuario_id: string): Promise<Reserva[] | null> {
    return await prisma.reserva.findMany({
      where: {
        usuario_id
      }
    });
  }
}
