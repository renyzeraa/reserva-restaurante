import { CONST } from "@/utils/const";
import { StatusReserva } from "@prisma/client";
import { z } from "zod";

export const reservaSchema = z.object({
  id: z.string().uuid().optional(), // O ID pode ser opcional na criação
  mesa_id: z.string().uuid({ message: "Mesa inválida" }),
  data_reserva: z.coerce.date().refine((date) => {
    const hora = date.getHours();
    const diaSemana = date.getDay(); // 0 = Domingo, 6 = Sábado

    return hora >= 18 && hora <= 23 && diaSemana !== 0;
  }, { message: "Reservas só podem ser feitas entre 18:00 e 23:59, exceto domingos." }),
  status: z.nativeEnum(StatusReserva).default(StatusReserva.CONFIRMADA), // Utilizando o enum do Prisma
});

export const updateReservaSchema = z.object({
  id: z.string().uuid(),
  mesa_id: z.string().uuid(),
  data_reserva: z.coerce.date().refine((date) => {
    const hora = date.getHours();
    const diaSemana = date.getDay(); // 0 = Domingo, 6 = Sábado

    return hora >= 18 && hora <= 23 && diaSemana !== 0;
  }, { message: "Reservas só podem ser feitas entre 18:00 e 23:59, exceto domingos." }),
  status: z.union([
    z.literal(CONST.STATUS.CANCELADA),
    z.literal(CONST.STATUS.CONFIRMADA)
  ])
});

export const checkReservaId = z.object({
  id: z.string().uuid()
});

export const reservaDateSchema = z.object({
  data: z.coerce.date().refine((date) => {
    const diaSemana = date.getDay(); // 0 = Domingo, 6 = Sábado
    return diaSemana !== 0;
  }, { message: "Reservas só podem ser feitas entre 18:00 e 23:59, exceto domingos." })
});
