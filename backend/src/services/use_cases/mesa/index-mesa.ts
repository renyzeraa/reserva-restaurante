import { Mesa } from "@prisma/client"
import { MesaPersistencia } from "@/persistence/mesa-persistence"
import { MesaNotFound } from "@/services/errors/mesa-not-found";

interface IndexUseCaseResponse {
  mesas: Mesa[]
}

export class IndexMesaUseCase {
  constructor(private mesaPersistencia: MesaPersistencia) { }

  async execute(): Promise<IndexUseCaseResponse> {
    const mesas = await this.mesaPersistencia.getAll();
    if (!mesas || !mesas.length) {
      throw new MesaNotFound();
    }
    return {
      mesas
    }
  }
}





