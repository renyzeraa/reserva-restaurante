import { PrismaReservaPersistence } from "@/persistence/prisma/prisma-reserva-persistence"
import { IndexReservaUseCase } from "@/services/use_cases/reserva/index-reserva"

export function getIndexReservaUseCase() {
  const prismaReservaPersistence = new PrismaReservaPersistence()
  const indexUseCase = new IndexReservaUseCase(prismaReservaPersistence)
  return indexUseCase
}