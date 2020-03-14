
// Sign-router
const express = require('express')
const router = express.Router()
class SignUpRouter {
  async route (req, res) {
    const { email, password, repeatPassword } = req.body
    new SignUpUseCase().signUp(email, password, repeatPassword)
    res.status(400).json({
      error: 'email, password and repeat must be exists'
    })
  }
}
// Sign-use-cases
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')
class SignUpUseCase {
  async signUp (email, password, repeatPassword) {
    if (email && typeof email !== 'undefined' && password && typeof password !== 'undefined' && repeatPassword && typeof repeatPassword !== 'undefined') {
      if (password === repeatPassword) {
        const user = await AccountModel.create({
          email, password
        })
        return user
      }
    }
  }
}

module.exports = () => {
  router.post('/signup', new SignUpRouter().route)
}
