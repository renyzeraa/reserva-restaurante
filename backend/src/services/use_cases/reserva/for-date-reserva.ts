import { Reserva } from "@prisma/client"
import { ReservaPersistencia } from "@/persistence/reserva-persistence"

interface reservaForDateUseCaseRequest {
  data: Date
}


interface reservaForDateUseCaseResponse {
  reservas: Reserva[]
}

export class ReservaForDateUseCase {
  constructor(private reservaPersistencia: ReservaPersistencia) { }

  async execute({ data }: reservaForDateUseCaseRequest): Promise<reservaForDateUseCaseResponse> {
    const reservas = await this.reservaPersistencia.findByDate(data) || []

    return {
      reservas
    }
  }
}





