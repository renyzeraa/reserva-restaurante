import { Prisma, Mesa } from "@prisma/client";

export interface MesaPersistencia {
  create(data: Prisma.MesaCreateInput): Promise<Mesa>
  findById(id: string): Promise<Mesa | null>
  update(id: string, data: Prisma.MesaUpdateInput): Promise<Mesa>
  getAll(): Promise<Mesa[]>
}