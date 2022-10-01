const { Router } = require('express')

const { CharacterServices, LocationServices, LoginServices } = require('./handlers')
const authMiddleware = require('./middlewares/auth')
const routes = new Router()

routes.post('/sign-in', LoginServices.login)

routes.use(authMiddleware)
routes.get('/list-characters', CharacterServices.listCharacters)
routes.get('/location-by-id', LocationServices.getLocationById)

module.exports = routes