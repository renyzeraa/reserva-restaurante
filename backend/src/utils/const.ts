import { $Enums } from "@prisma/client";

export const CONST = {
  TIPO_USUARIO: {
    ADMINISTRADOR: $Enums.TipoUsuario.ADMINISTRADOR,
    NORMAL: $Enums.TipoUsuario.NORMAL,
  },
  STATUS: {
    CONFIRMADA: $Enums.StatusReserva.CONFIRMADA,
    CANCELADA: $Enums.StatusReserva.CANCELADA
  }
};

export const SQL = {
  OPERADOR: {
    IGUAL: "=",
    DIFERENTE: "!=",
    MAIOR: ">",
    MENOR: "<",
    MAIOR_IGUAL: ">=",
    MENOR_IGUAL: "<=",
    LIKE: "LIKE",
    IN: "IN",
    NOT_IN: "NOT IN",
    BETWEEN: "BETWEEN",
    NOT_BETWEEN: "NOT BETWEEN",
    IS_NULL: "IS NULL",
    IS_NOT_NULL: "IS NOT NULL",
    IS_TRUE: "IS TRUE",
    IS_NOT_TRUE: "IS NOT TRUE",
    IS_FALSE: "IS FALSE",
    IS_NOT_FALSE: "IS NOT FALSE",
    IS_UNKNOWN: "IS UNKNOWN",
    IS_NOT_UNKNOWN: "IS NOT UNKNOWN",
    IS_EMPTY: "IS EMPTY",
    IS_NOT_EMPTY: "IS NOT EMPTY",
  },
};