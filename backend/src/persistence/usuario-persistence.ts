import { Prisma, Usuario } from "@prisma/client";

export interface UsuarioPersistencia {
  create(data: Prisma.UsuarioCreateInput): Promise<Usuario>
  findByEmail(email: string): Promise<Usuario | null>
  findById(id: string): Promise<Usuario | null>
  update(id: string, data: Prisma.UsuarioUpdateInput): Promise<Usuario>
}