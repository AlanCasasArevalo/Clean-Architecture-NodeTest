
module.exports = class InvalidParamError extends Error {
  constructor (paramsName) {
    super(`Invalid param: ${paramsName}`)
    this.name = 'InvalidParamError'
  };
}
