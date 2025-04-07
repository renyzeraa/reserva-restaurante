import { PrismaUsuarioPersistence } from "@/persistence/prisma/prisma-usuario-persistence"
import { CreateUsuarioUseCase } from "../../use_cases/usuario/registro-usuario"

export function makeCreateUseCase() {
  const prismaUsuarioPersistence = new PrismaUsuarioPersistence()
  const registerUseCase = new CreateUsuarioUseCase(prismaUsuarioPersistence)
  return registerUseCase
}