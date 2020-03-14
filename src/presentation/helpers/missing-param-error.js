
module.exports = class MissingParamError extends Error {
  constructor (paramsName) {
    super(`Missing param: ${paramsName}`)
    this.name = 'MissingParamError'
  };
}
