import { Reserva, StatusReserva } from "@prisma/client"
import { MesaPersistencia } from "@/persistence/mesa-persistence"
import { UsuarioPersistencia } from "@/persistence/usuario-persistence"
import { ResourceNotFound } from "@/services/errors/resource-not-found";
import { MesaNotFound } from "@/services/errors/mesa-not-found";
import { ReservaPersistencia } from "@/persistence/reserva-persistence";
import { MesaAlreadyReserved } from "@/services/errors/mesaAlreadyReserved";

interface CreateReservaUseCaseRequest {
  mesa_id: string;
  usuario_id: string;
  data_reserva: Date;
}

interface CreateUseReservaCaseResponse {
  reserva: Reserva
}

export class CreateReservaUseCase {
  constructor(
    private reservaPersistencia: ReservaPersistencia,
    private mesaPersistencia: MesaPersistencia,
    private usuarioPersistencia: UsuarioPersistencia
  ) { }

  async execute({
    data_reserva,
    mesa_id,
    usuario_id
  }: CreateReservaUseCaseRequest): Promise<CreateUseReservaCaseResponse> {
    const usuario = await this.usuarioPersistencia.findById(usuario_id)
    if (!usuario) {
      throw new ResourceNotFound();
    }

    const mesa = await this.mesaPersistencia.findById(mesa_id)
    if (!mesa) {
      throw new MesaNotFound();
    }

    // Verifica se já existe uma reserva para a mesma mesa no mesmo dia
    const inicioDoDia = new Date(data_reserva);
    inicioDoDia.setHours(0, 0, 0, 0);

    const fimDoDia = new Date(data_reserva);
    fimDoDia.setHours(23, 59, 59, 999);

    const reservaExistente = await this.reservaPersistencia.findByMesaAndDateRange(mesa_id, inicioDoDia, fimDoDia);
    if (reservaExistente) {
      throw new MesaAlreadyReserved();
    }

    const reserva = await this.reservaPersistencia.create({
      data_reserva,
      status: StatusReserva.CONFIRMADA,
      usuario: { connect: { id: usuario_id } },
      mesa: { connect: { id: mesa_id } }
    })

    return {
      reserva
    }
  }
}





