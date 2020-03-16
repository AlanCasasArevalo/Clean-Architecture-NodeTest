const HttpResponse = require('.././helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')
module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      // }else if (!/email/.test(email)) {
      //   return HttpResponse.badRequest('email')
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
