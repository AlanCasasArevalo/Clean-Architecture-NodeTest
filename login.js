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

const express = require('express')
const router = express.Router()
module.exports = () => {
  router.post('/signup', new SignUpRouter().route)
}




















