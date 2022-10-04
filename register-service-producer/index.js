require('dotenv').config()
const express = require('express')

const routes = require('./src/routes')

const server = express()

server.use(express.json())
server.use( routes)

server.listen(process.env.PORT, () => console.log(`Server listening on port:::${process.env.PORT}`))