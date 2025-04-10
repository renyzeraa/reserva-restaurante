import { Mesa, Reserva } from "@prisma/client"
import { MesaPersistencia } from "@/persistence/mesa-persistence"
import { MesaNotFound } from "@/services/errors/mesa-not-found";
import { ReservaPersistencia } from "@/persistence/reserva-persistence";

interface IndexUseCaseRequest {
  date?: Date
}

interface IndexUseCaseResponse {
  mesas: Mesa[]
}

export class IndexMesaUseCase {
  constructor(private mesaPersistencia: MesaPersistencia, private prismaReservaPersistence: ReservaPersistencia) { }

  async execute({ date }: IndexUseCaseRequest): Promise<IndexUseCaseResponse> {
    let mesas = await this.mesaPersistencia.getAll();
    if (!mesas || !mesas.length) {
      throw new MesaNotFound();
    }

    let reservas: Reserva[] = [];
    if (date) {
      reservas = await this.prismaReservaPersistence.findByDate(date) || []
    }
    mesas = mesas.map(mesa => ({ ...mesa, disponivel: reservas.find(reserva => reserva.mesa_id === mesa.id) ? false : true }))
    return {
      mesas
    }
  }
}





