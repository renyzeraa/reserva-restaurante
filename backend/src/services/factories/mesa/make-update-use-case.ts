import { PrismaMesaPersistence } from "@/persistence/prisma/prisma-mesa.persistence"
import { PrismaUsuarioPersistence } from "@/persistence/prisma/prisma-usuario-persistence"
import { UpdateMesaUseCase } from "@/services/use_cases/mesa/update-mesa"

export function makeUpdateMesaUseCase() {
  const prismaMesaPersistence = new PrismaMesaPersistence()
  const prismaUsuarioPersistence = new PrismaUsuarioPersistence()
  const updateUseCase = new UpdateMesaUseCase(prismaMesaPersistence, prismaUsuarioPersistence)
  return updateUseCase
}