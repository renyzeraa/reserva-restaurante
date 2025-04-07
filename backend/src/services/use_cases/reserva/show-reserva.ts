import { Reserva } from "@prisma/client"
import { ReservaPersistencia } from "@/persistence/reserva-persistence"
import { ReservaNotFound } from "@/services/errors/reserva-not-found";

interface indexReservaUseCaseRequest {
  id: string;
}

interface indexReservaUseCaseResponse {
  reserva: Reserva
}

export class ShowReservaUseCase {
  constructor(private reservaPersistencia: ReservaPersistencia) { }

  async execute({ id }: indexReservaUseCaseRequest): Promise<indexReservaUseCaseResponse> {
    const reserva = await this.reservaPersistencia.findById(id)
    if (!reserva) {
      throw new ReservaNotFound();
    }
    return {
      reserva
    }
  }
}





