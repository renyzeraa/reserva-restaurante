import { PrismaMesaPersistence } from "@/persistence/prisma/prisma-mesa.persistence"
import { PrismaReservaPersistence } from "@/persistence/prisma/prisma-reserva-persistence"
import { IndexMesaUseCase } from "@/services/use_cases/mesa/index-mesa"

export function getIndexMesaUseCase() {
  const prismaMesaPersistence = new PrismaMesaPersistence()
  const prismaReservaPersistence = new PrismaReservaPersistence()
  const indexUseCase = new IndexMesaUseCase(prismaMesaPersistence, prismaReservaPersistence)
  return indexUseCase
}