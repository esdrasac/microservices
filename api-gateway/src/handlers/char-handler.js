const axios = require('axios')

class CharacterServices {
    static async listCharacters(req, res) {
        try {
            const chars = await axios.get(`${process.env.CHARACTER_SERVICE_URL}/char`, {
                params: req.query 
            })

            return res.status(200).json(chars.data)
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).json({ error: error.message || 'Server error' })
        }
    }
}

module.exports = CharacterServices