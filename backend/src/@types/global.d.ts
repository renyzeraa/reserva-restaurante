import { CONST } from "../utils/const";

export type TipoUsuario = keyof typeof CONST.TIPO_USUARIO;

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;
  reservas?: Reserva[];
}

export interface Mesa {
  id: string;
  nome: string;
  reservas?: Reserva[];
}

export interface Reserva {
  id: string;
  mesa_id: string;
  usuario_id: string;
  date: Date;
  time: string;
  usuario?: Usuario;
  mesa?: Mesa;
}
