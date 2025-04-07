import { Reserva, StatusReserva } from "@prisma/client"
import { ReservaPersistencia } from "@/persistence/reserva-persistence"
import { MesaPersistencia } from "@/persistence/mesa-persistence"
import { UsuarioPersistencia } from "@/persistence/usuario-persistence"
import { ResourceNotFound } from "@/services/errors/resource-not-found";
import { MesaNotFound } from "@/services/errors/mesa-not-found";
import { ReservaNotFound } from "@/services/errors/reserva-not-found";
import { UsuarioNotPermission } from "@/services/errors/user-not-have-permission";
import { MesaAlreadyReserved } from "@/services/errors/mesaAlreadyReserved";

interface UpdateReservaUseCaseRequest {
  id: string;
  mesa_id: string;
  usuario_id: string;
  status: StatusReserva;
  data_reserva: Date;
}

interface UpdateUseReservaCaseResponse {
  reserva: Reserva
}

export class UpdateReservaUseCase {
  constructor(
    private reservaPersistencia: ReservaPersistencia,
    private mesaPersistencia: MesaPersistencia,
    private usuarioPersistencia: UsuarioPersistencia
  ) { }

  async execute({
    mesa_id,
    usuario_id,
    id,
    data_reserva,
    status
  }: UpdateReservaUseCaseRequest): Promise<UpdateUseReservaCaseResponse> {
    const usuario = await this.usuarioPersistencia.findById(usuario_id)
    if (!usuario) {
      throw new ResourceNotFound();
    }

    const reserva = await this.reservaPersistencia.findById(id)
    if (!reserva) {
      throw new ReservaNotFound();
    }

    if (reserva.usuario_id !== usuario_id) {
      throw new UsuarioNotPermission();
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
    if (reservaExistente && reservaExistente.id !== id) {
      throw new MesaAlreadyReserved();
    }

    const reservaUpdated = await this.reservaPersistencia.update(id, {
      data_reserva,
      status,
      usuario: { connect: { id: usuario_id } },
      mesa: { connect: { id: mesa_id } }
    })

    return {
      reserva: reservaUpdated
    }
  }
}





