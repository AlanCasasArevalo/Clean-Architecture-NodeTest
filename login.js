const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AccountModel = mongoose.model('Account')

module.exports = () => {
  router.post('/signup', async (req, res) => {
    const { email, password, repeatPassword } = req.body;
    if (email && typeof email !== 'undefined' && password && typeof password !== 'undefined' && repeatPassword && typeof repeatPassword !== 'undefined') {
      if (password === repeatPassword) {
        const user = await AccountModel.create({
          email, password
        });
        res.status(200).json(user);
      } else {
        res.status(400).json({
          error: 'password and repeatPassword must be equal'
        })
      }
    } else {
      res.status(400).json({
        error: 'email, password and repeat must be exists'
      })
    }
  })
}
