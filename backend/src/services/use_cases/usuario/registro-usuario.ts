import { UsuarioPersistencia } from "@/persistence/usuario-persistence"
import { hash } from "bcryptjs"
import { $Enums, Usuario } from "@prisma/client"
import { UsuarioEmailExists } from "@/services/errors/user-email-already-exists"

interface CreateUseCaseRequest {
  nome: string
  email: string
  senha: string
  tipo: $Enums.TipoUsuario
}

interface CreateUseCaseResponse {
  usuario: Usuario
}

export class CreateUsuarioUseCase {
  constructor(private usuarioPersistencia: UsuarioPersistencia) { }

  async execute({
    nome,
    email,
    senha,
    tipo,
  }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
    const senha_hash = await hash(senha, 6)

    const userWithSameEmail = await this.usuarioPersistencia.findByEmail(email)
    if (userWithSameEmail) {
      throw new UsuarioEmailExists()
    }

    const usuario = await this.usuarioPersistencia.create({
      nome,
      email,
      senha: senha_hash,
      tipo,
    })

    return {
      usuario
    }
  }
}





