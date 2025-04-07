import { PrismaMesaPersistence } from "@/persistence/prisma/prisma-mesa.persistence"
import { PrismaReservaPersistence } from "@/persistence/prisma/prisma-reserva-persistence"
import { PrismaUsuarioPersistence } from "@/persistence/prisma/prisma-usuario-persistence"
import { UpdateReservaUseCase } from "@/services/use_cases/reserva/update-reserva"

export function makeUpdateReservaUseCase() {
  const prismaReservaPersistence = new PrismaReservaPersistence()
  const prismaUsuarioPersistence = new PrismaUsuarioPersistence()
  const prismaMesaPersistence = new PrismaMesaPersistence()
  const updateUseCase = new UpdateReservaUseCase(prismaReservaPersistence, prismaMesaPersistence, prismaUsuarioPersistence)
  return updateUseCase
}