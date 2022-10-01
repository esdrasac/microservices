const axios = require('axios')

module.exports = {
    characterAPI: axios.create({
        baseURL: process.env.RICK_AND_MORTY_API_CHARACTER
    })
} 
