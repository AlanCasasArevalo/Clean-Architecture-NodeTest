const HttpResponse = require('.././helpers/http-response')
module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
      return HttpResponse.serverError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest('email')
    } else if (!password) {
      return HttpResponse.badRequest('password')
    } else {
      const accessToken = this.authUseCase.auth(email, password)
      if (accessToken && typeof accessToken !== 'undefined') {
        return HttpResponse.success()
      } else {
        return HttpResponse.unAuthorizedError()
      }
    }
  }
}
