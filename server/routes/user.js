const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const {sendHelloEmail, sendGoodByeEmail} = require('../emails/email')

router.post('/', async (req, res) =>{
  const newUser = new User(req.body)
  try {
      await newUser.save()
      sendHelloEmail(newUser.email, newUser.firstName)
      const token = await newUser.generateToken()
      res.status(201).send({newUser, token})
  } catch (error) {
      console.log(error)
      res.status(400).send(error)
  }
})

router.post('/login', async (req, res) => {
  try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateToken()
      res.send({user, token})
  } catch (error) {
      res.status(400).send(error)
  }
})

router.post('/logout', auth, async (req, res) => {
  try {
      req.user.tokens = req.user.tokens.filter((token) => {
          return token.token !== req.token
      })
      await req.user.save()
      res.send()
  } catch (error) {
      res.status(500).send('Unable to logout')
  }
})

router.post('/logoutAll', auth, async (req, res) => {
  try {
      req.user.tokens = []
      await req.user.save()
      res.send()
  } catch (error) {
      res.status(500).send('Unable to logout')
  }
})

router.get('/me', auth, async (req, res) => {
  res.send(req.user)
})

router.patch('/me', auth, async (req, res) =>{
  const updates = Object.keys(req.body)
  const allowedUpdate = ['name', 'email', 'password', 'age']
  const isValidUpdate = updates.every((update) => {
      return allowedUpdate.includes(update)
  })
  if (!isValidUpdate) {
      return res.status(400).send({error: 'Invalid Updates'})
  }

  try {
      updates.forEach((update) => req.user[update] = req.body[update])
      await req.user.save()

      res.send(req.user)
  } catch (error) {
      res.status(400).send(error)
  }
})

router.delete('/me', auth, async (req, res) => {
  try {
      await req.user.remove()
      sendGoodByeEmail(req.user.email, req.user.firstName)
      res.send(req.user)
  } catch (error) {
      res.status(400).send(error)
  }
})

module.exports = router;
