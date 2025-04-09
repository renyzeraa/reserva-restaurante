import { PrismaReservaPersistence } from "@/persistence/prisma/prisma-reserva-persistence"
import { ReservaForDateUseCase } from "@/services/use_cases/reserva/for-date-reserva"

export function getReservaForDateUseCase() {
  const prismaReservaPersistence = new PrismaReservaPersistence()
  const reservaForDateUseCase = new ReservaForDateUseCase(prismaReservaPersistence)
  return reservaForDateUseCase
}