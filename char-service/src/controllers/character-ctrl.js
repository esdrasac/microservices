const yup = require('yup')
const { CharacterService } = require('../services')
class CharacterController {
    static async getCharacters(req, res) {
        try {
            const schema = yup.object().shape({
                page: yup.number().required()
            })
    
            if(!(await schema.isValid(req.query))) {
                console.log('Validation')
                throw   { status: 400, message: 'Validation fails'}
            }

            const chars = await CharacterService.getChars(req.query.page)

            return res.status(200).json(chars)
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message || 'Server error' })
        }
    }
}

module.exports = CharacterController