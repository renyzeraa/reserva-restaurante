import { PrismaMesaPersistence } from "@/persistence/prisma/prisma-mesa.persistence"
import { PrismaReservaPersistence } from "@/persistence/prisma/prisma-reserva-persistence"
import { PrismaUsuarioPersistence } from "@/persistence/prisma/prisma-usuario-persistence"
import { CreateReservaUseCase } from "@/services/use_cases/reserva/registrar-reserva"

export function makeCreateReservaUseCase() {
  const prismaReservaPersistence = new PrismaReservaPersistence()
  const prismaMesaPersistence = new PrismaMesaPersistence()
  const prismaUsuarioPersistence = new PrismaUsuarioPersistence()
  const createUseCase = new CreateReservaUseCase(prismaReservaPersistence, prismaMesaPersistence, prismaUsuarioPersistence)
  return createUseCase
}