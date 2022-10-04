const { Router } = require('express')
const routes = new Router

const { RegisterController } = require('../controllers')

routes.post('/register', RegisterController.createUser)

module.exports = routes