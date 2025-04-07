import { Reserva } from "@prisma/client"
import { ReservaPersistencia } from "@/persistence/reserva-persistence"
import { ReservaNotFound } from "@/services/errors/reserva-not-found";

interface indexReservaUseCaseResponse {
  reservas: Reserva[]
}

export class IndexReservaUseCase {
  constructor(private reservaPersistencia: ReservaPersistencia) { }

  async execute(): Promise<indexReservaUseCaseResponse> {
    const reservas = await this.reservaPersistencia.getAll()
    if (!reservas) {
      throw new ReservaNotFound();
    }
    return {
      reservas
    }
  }
}





