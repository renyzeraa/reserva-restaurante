import { PrismaUsuarioPersistence } from "@/persistence/prisma/prisma-usuario-persistence"
import { UpdateUsuarioUseCase } from "../../use_cases/usuario/atualizar-usuario"

export function makeUpdateUseCase() {
  const prismaUsuarioPersistence = new PrismaUsuarioPersistence()
  const updateUseCase = new UpdateUsuarioUseCase(prismaUsuarioPersistence)
  return updateUseCase
}