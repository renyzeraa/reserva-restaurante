import { Prisma, Reserva } from "@prisma/client";

export interface ReservaPersistencia {
  create(data: Prisma.ReservaCreateInput): Promise<Reserva>
  findById(id: string): Promise<Reserva | null>
  update(id: string, data: Prisma.ReservaUpdateInput): Promise<Reserva>
  getAll(): Promise<Reserva[]>
  findByMesaAndDateRange(mesa_id: string, inicio: Date, fim: Date): Promise<Reserva | null>
  findByDate(date: Date): Promise<Reserva[]>
  getAllForUser(usuario_id: string): Promise<Reserva[] | null>
}