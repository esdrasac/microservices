const { Router } = require('express')
const routes = new Router

const { CharacterController } = require('../controllers')

routes.get('/char', CharacterController.getCharacters)

module.exports = routes