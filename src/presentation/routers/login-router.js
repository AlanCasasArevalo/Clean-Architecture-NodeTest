const HttpResponse = require('.././helpers/http-response')
const {MissingParamError, InvalidParamError} = require('../errors/index')

module.exports = class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      } else if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
      } else if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      } else {
        const accessToken = await this.authUseCase.auth(email, password)
        if (accessToken && typeof accessToken !== 'undefined') {
          return HttpResponse.success({ accessToken })
        } else {
          return HttpResponse.unAuthorizedError()
        }
      }
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
