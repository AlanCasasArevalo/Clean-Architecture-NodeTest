// Sign-router
class SignUpRouter {
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body
    if (email && typeof email !== 'undefined' && password && typeof password !== 'undefined' && repeatPassword && typeof repeatPassword !== 'undefined') {
      const user = new SignUpUseCase().signUp(email, password, repeatPassword)
      return {
        statusCode: 200,
        body: user
      }
    } else {
      return {
        statusCode: 400,
        body: {
          error: 'Email, password, repeatPassword can not be empty'
        }
      }
    }

  }
}

// Sign-use-cases
class SignUpUseCase {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountRepository().addNewUser(email, password, repeatPassword)
    }
  }
}

const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')
class AddAccountRepository {
  async addNewUser (email, password, repeatPassword) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}

class ExpressRouterAdapter {
  static adapter (router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = await router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

const express = require('express')
const router = express.Router()
module.exports = () => {
  const router = new SignUpRouter()
  router.post('/signup', new ExpressRouterAdapter.adapter(router))
}




















