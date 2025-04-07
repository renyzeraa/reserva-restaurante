export class UsuarioNotPermission extends Error {
  constructor() {
    super("Usuário sem permissão !")
  }
}