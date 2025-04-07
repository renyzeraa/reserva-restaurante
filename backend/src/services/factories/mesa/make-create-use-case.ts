import { PrismaMesaPersistence } from "@/persistence/prisma/prisma-mesa.persistence"
import { CreateMesaUseCase } from "@/services/use_cases/mesa/registrar-mesa"

export function makeCreateMesaUseCase() {
  const prismaMesaPersistence = new PrismaMesaPersistence()
  const createUseCase = new CreateMesaUseCase(prismaMesaPersistence)
  return createUseCase
}