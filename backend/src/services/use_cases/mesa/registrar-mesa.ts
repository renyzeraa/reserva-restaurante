import { Mesa } from "@prisma/client"
import { MesaPersistencia } from "@/persistence/mesa-persistence"

interface CreateUseCaseRequest {
  nome: string;
}

interface CreateUseCaseResponse {
  mesa: Mesa
}

export class CreateMesaUseCase {
  constructor(private mesaPersistencia: MesaPersistencia) { }

  async execute({
    nome
  }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
    const mesa = await this.mesaPersistencia.create({
      nome
    })

    return {
      mesa
    }
  }
}





