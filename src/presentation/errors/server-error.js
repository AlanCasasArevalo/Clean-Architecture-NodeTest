
module.exports = class ServerError extends Error {
  constructor (paramsName) {
    super('Internal Error')
    this.name = 'ServerError'
  };
}
