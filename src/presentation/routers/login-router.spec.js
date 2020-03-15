const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')

const makeSut = () => {
  class AuthUseCase {
    auth(email) {
      this.email = email
    }
  }
  const authUseCase = new AuthUseCase()
  const sut = new LoginRouter(authUseCase)
  return {
    authUseCase,
    sut
  }
}

describe('Login Router', () => {
  test('should return 400 if no email is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        password: 'cualquiercosa'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'cualquiercosa@cualquiercosa.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no httpRequest does not contain body', () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call AuthUseCase with correct params', () => {
    const { sut, authUseCase } = makeSut()
    const httpRequest = {
      body: {
        email: 'cualquiercosa@cualquiercosa.com',
        password: 'cualquiercosa'
      }
    }
    sut.route(httpRequest)
    expect(authUseCase.email).toBe(httpRequest.body.email)
    expect(authUseCase.password).toBe(httpRequest.body.password)
  })
})
