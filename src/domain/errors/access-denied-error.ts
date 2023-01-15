export class AccessDeniedError extends Error {
  constructor () {
    super('Aceso negado.')
    this.name = 'AccessDeniedError'
  }
}
