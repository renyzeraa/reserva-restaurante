export class ResourceNotFound extends Error {
  constructor() {
    super("Local não encontrado")
  }
}