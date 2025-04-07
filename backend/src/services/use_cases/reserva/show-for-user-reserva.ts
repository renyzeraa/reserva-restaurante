import { Reserva } from "@prisma/client"
import { ReservaPersistencia } from "@/persistence/reserva-persistence"

interface indexReservaUseCaseRequest {
  usuario_id: string;
}

interface indexReservaUseCaseResponse {
  reservas: Reserva[]
}

export class ShowReservaForUserUseCase {
  constructor(private reservaPersistencia: ReservaPersistencia) { }

  async execute({ usuario_id }: indexReservaUseCaseRequest): Promise<indexReservaUseCaseResponse> {
    const reservas = await this.reservaPersistencia.getAllForUser(usuario_id) || []

    return {
      reservas
    }
  }
}





