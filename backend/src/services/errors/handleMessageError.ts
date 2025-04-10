import { MesaNotFound } from "./mesa-not-found";
import { MesaAlreadyReserved } from "./mesaAlreadyReserved";
import { ReservaNotFound } from "./reserva-not-found";
import { ResourceNotFound } from "./resource-not-found";
import { UsuarioEmailExists } from "./user-email-already-exists";
import { UsuarioEmailPasswordWrong } from "./user-not-exists";
import { UsuarioNotPermission } from "./user-not-have-permission";

interface ErrorResponse {
  message: string;
  statusCode: number;
}

/**
 * Método para lidar com as mensagens de erro
 * Deve inserir todas as instâncias aqui para definir seu statusCode
 * @param instance 
 * @returns 
 */
export function getMessageError(instance: any): ErrorResponse {
  if (instance instanceof MesaAlreadyReserved) {
    return {
      message: instance.message,
      statusCode: 401
    }
  }
  if (
    instance instanceof UsuarioEmailExists ||
    instance instanceof UsuarioEmailPasswordWrong
  ) {
    return {
      message: instance.message,
      statusCode: 409
    }
  }
  if (instance instanceof UsuarioNotPermission) {
    return {
      message: instance.message,
      statusCode: 403
    }
  }
  if (
    instance instanceof MesaNotFound ||
    instance instanceof ResourceNotFound ||
    instance instanceof ReservaNotFound
  ) {
    return {
      message: instance.message,
      statusCode: 404
    }
  }

  console.error({
    message: instance.message,
    name: instance.name,
    status: instance.statusCode || instance.statusCode
  })

  return {
    message: instance.message ?? "Erro no servidor",
    statusCode: (instance.statusCode || instance.statusCode) ?? 500,
  }
}