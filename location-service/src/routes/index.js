const { Router } = require('express')
const routes = new Router

const { LocationController } = require('../controllers')

routes.get('/location', LocationController.getLocationById)

module.exports = routes