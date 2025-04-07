import { UsuarioPersistencia } from "@/persistence/usuario-persistence";
import { compare } from "bcryptjs";
import { Usuario } from "@prisma/client";
import { UsuarioEmailPasswordWrong } from "@/services/errors/user-not-exists";

interface AutenticacaoUseCaseRequest {
  email: string;
  senha: string;
}

interface AutenticacaoUseCaseResponse {
  usuario: Usuario
}

export class AutenticacaoUseCase {
  constructor(private usuarioPersistencia: UsuarioPersistencia) { }

  async execute({ email, senha }: AutenticacaoUseCaseRequest): Promise<AutenticacaoUseCaseResponse> {
    const usuario = await this.usuarioPersistencia.findByEmail(email)
    if (!usuario) {
      throw new UsuarioEmailPasswordWrong()
    }

    const senhaOk = await compare(senha, usuario.senha)
    if (!senhaOk) {
      throw new UsuarioEmailPasswordWrong()
    }

    return {
      usuario
    }
  }
}
