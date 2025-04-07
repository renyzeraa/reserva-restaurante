import { PrismaUsuarioPersistence } from "@/persistence/prisma/prisma-usuario-persistence"
import { PerfilUsuarioUseCase } from "../../use_cases/usuario/buscar-usuario"

export function perfilUsuario() {
  const prismaUsuarioPersistence = new PrismaUsuarioPersistence()
  const perfilUseCase = new PerfilUsuarioUseCase(prismaUsuarioPersistence)
  return perfilUseCase
}