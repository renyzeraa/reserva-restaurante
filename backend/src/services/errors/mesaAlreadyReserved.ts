export class MesaAlreadyReserved extends Error {
  constructor() {
    super("Mesa já esta reservada para está data !")
  }
}