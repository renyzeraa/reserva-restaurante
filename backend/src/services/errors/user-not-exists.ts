export class UsuarioEmailPasswordWrong extends Error {
  constructor() {
    super("E-mail ou Senha está incorreto")
  }
}