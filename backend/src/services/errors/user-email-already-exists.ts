export class UsuarioEmailExists extends Error {
  constructor() {
    super("Tente outro e-mail!")
  }
}