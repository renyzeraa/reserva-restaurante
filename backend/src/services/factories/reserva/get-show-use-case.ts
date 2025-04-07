import { PrismaReservaPersistence } from "@/persistence/prisma/prisma-reserva-persistence"
import { ShowReservaUseCase } from "@/services/use_cases/reserva/show-reserva"

export function getShowReservaUseCase() {
  const prismaReservaPersistence = new PrismaReservaPersistence()
  const showUseCase = new ShowReservaUseCase(prismaReservaPersistence)
  return showUseCase
}