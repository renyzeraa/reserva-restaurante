import { PrismaMesaPersistence } from "@/persistence/prisma/prisma-mesa.persistence"
import { ShowMesaUseCase } from "@/services/use_cases/mesa/show-mesa"

export function getShowMesaUseCase() {
  const prismaMesaPersistence = new PrismaMesaPersistence()
  const showUseCase = new ShowMesaUseCase(prismaMesaPersistence)
  return showUseCase
}