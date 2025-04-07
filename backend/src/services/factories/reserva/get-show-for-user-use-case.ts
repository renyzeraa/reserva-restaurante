import { PrismaReservaPersistence } from "@/persistence/prisma/prisma-reserva-persistence"
import { ShowReservaForUserUseCase } from "@/services/use_cases/reserva/show-for-user-reserva"

export function getShowReservaForUserUseCase() {
  const prismaReservaPersistence = new PrismaReservaPersistence()
  const showForUserUseCase = new ShowReservaForUserUseCase(prismaReservaPersistence)
  return showForUserUseCase
}