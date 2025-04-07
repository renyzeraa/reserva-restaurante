import { PrismaUsuarioPersistence } from "@/persistence/prisma/prisma-usuario-persistence"
import { AutenticacaoUseCase } from "../../use_cases/usuario/autenticacao-usuario"

export function makeAuthenticatedUseCase() {
  const prismaUsuarioPersistence = new PrismaUsuarioPersistence()
  const authenticatedUseCase = new AutenticacaoUseCase(prismaUsuarioPersistence)
  return authenticatedUseCase
}