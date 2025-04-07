import { UsuarioPersistencia } from "@/persistence/usuario-persistence"
import { compare, hash } from "bcryptjs"
import { $Enums, Usuario } from "@prisma/client"
import { ResourceNotFound } from "@/services/errors/resource-not-found"
import { UsuarioSenhaWrong } from "@/services/errors/user-password-wrong"
import { UsuarioEmailExists } from "@/services/errors/user-email-already-exists"

interface UpdateUseCaseRequest {
  id: string
  nome?: string
  email?: string
  senha: string
  senha_old: string
  tipo: $Enums.TipoUsuario
}

interface UpdateUseCaseResponse {
  usuario: Usuario
}

export class UpdateUsuarioUseCase {
  constructor(private usersRepository: UsuarioPersistencia) { }

  async execute({
    nome,
    email,
    senha,
    tipo,
    senha_old,
    id,
  }: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const user = await this.usersRepository.findById(id)
    if (!user) {
      throw new ResourceNotFound();
    }
    if (email) {
      const userWithEmail = await this.usersRepository.findByEmail(email)
      if (userWithEmail && userWithEmail.id !== id) {
        throw new UsuarioEmailExists()
      }
    }

    const senhaOk = await compare(senha_old, user.senha)
    if (!senhaOk) {
      throw new UsuarioSenhaWrong()
    }
    senha = await hash(senha, 6);

    const usuario = await this.usersRepository.update(id, {
      nome: nome ?? user.nome,
      email: email ?? user.email,
      senha,
      tipo,
    })

    return {
      usuario
    }
  }
}





