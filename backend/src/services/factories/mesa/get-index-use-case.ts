import { PrismaMesaPersistence } from "@/persistence/prisma/prisma-mesa.persistence"
import { IndexMesaUseCase } from "@/services/use_cases/mesa/index-mesa"

export function getIndexMesaUseCase() {
  const prismaMesaPersistence = new PrismaMesaPersistence()
  const indexUseCase = new IndexMesaUseCase(prismaMesaPersistence)
  return indexUseCase
}