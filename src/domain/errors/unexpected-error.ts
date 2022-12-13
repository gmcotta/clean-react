export class UnexpectedError extends Error {
  constructor () {
    super('Aconteceu algo de errado. Tente novamente mais tarde.')
    this.name = 'UnexpectedError'
  }
}
