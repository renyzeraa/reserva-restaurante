import { Mesa } from "@prisma/client"
import { MesaPersistencia } from "@/persistence/mesa-persistence"
import { MesaNotFound } from "@/services/errors/mesa-not-found";

interface ShowUseCaseRequest {
  id: string;
}

interface ShowUseCaseResponse {
  mesa: Mesa
}

export class ShowMesaUseCase {
  constructor(private mesaPersistencia: MesaPersistencia) { }

  async execute({
    id
  }: ShowUseCaseRequest): Promise<ShowUseCaseResponse> {
    const mesa = await this.mesaPersistencia.findById(id);
    if (!mesa) {
      throw new MesaNotFound();
    }

    return {
      mesa
    }
  }
}





