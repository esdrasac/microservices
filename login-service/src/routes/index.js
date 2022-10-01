const { Router } = require('express')
const routes = new Router()

const { SessionController } = require('../controllers')

routes.post('/login', SessionController.login)

module.exports = routes