
module.exports = class UnauthorizedError extends Error {
  constructor (paramsName) {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  };
}
