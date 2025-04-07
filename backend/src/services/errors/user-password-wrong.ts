export class UsuarioSenhaWrong extends Error {
  constructor() {
    super("Senha incorreta")
  }
}