import { UsuarioPersistencia } from "@/persistence/usuario-persistence"
import { ResourceNotFound } from "@/services/errors/resource-not-found"
import { Usuario } from "@prisma/client"

interface PerfilUsuarioUseCaseRequest {
  id: string
}

interface PerfilUsuarioUseCaseResponse {
  usuario: Usuario
}

export class PerfilUsuarioUseCase {
  constructor(private usersRepository: UsuarioPersistencia) { }

  async execute({
    id
  }: PerfilUsuarioUseCaseRequest): Promise<PerfilUsuarioUseCaseResponse> {
    const usuario = await this.usersRepository.findById(id)
    if (!usuario) {
      throw new ResourceNotFound();
    }
    return {
      usuario
    }
  }
}





