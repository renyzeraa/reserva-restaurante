import { Mesa } from "@prisma/client"
import { MesaPersistencia } from "@/persistence/mesa-persistence"
import { UsuarioPersistencia } from "@/persistence/usuario-persistence";
import { ResourceNotFound } from "@/services/errors/resource-not-found";
import { CONST } from "@/utils/const";
import { UsuarioNotPermission } from "@/services/errors/user-not-have-permission";
import { MesaNotFound } from "@/services/errors/mesa-not-found";

interface UpdateUseCaseRequest {
  id: string
  nome: string
  usuario_id: string
}

interface UpdateUseCaseResponse {
  mesa: Mesa
}

export class UpdateMesaUseCase {
  constructor(private mesaPersistencia: MesaPersistencia, private usuarioPersistencia: UsuarioPersistencia) { }

  async execute({
    id,
    nome,
    usuario_id
  }: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const usuario = await this.usuarioPersistencia.findById(usuario_id);
    if (!usuario) {
      throw new ResourceNotFound();
    }
    if (usuario.tipo !== CONST.TIPO_USUARIO.ADMINISTRADOR) {
      throw new UsuarioNotPermission();
    }
    const mesaCheck = await this.mesaPersistencia.findById(id);
    if (!mesaCheck) {
      throw new MesaNotFound();
    }

    const mesa = await this.mesaPersistencia.update(id, { nome })

    return {
      mesa
    }
  }
}





