const yup = require('yup')
const { EnqueueService } = require('../services')
class RegisterController {
    static async createUser(req, res) {
        try {
            const schema = yup.object().shape({
                name: yup.string().required(),
                email: yup.string().email().required(),
                password: yup.string().min(6).required()
            })

            if(!(await schema.isValid(req.body))) {
                throw { status: 400, message: 'Validation Fails'}
            }

            await EnqueueService.enqueue(req.body)

            res.status(200).json({ email: req.body.email, message: 'User created'})
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({ error: error.message || 'Server Error'})
        }
    }
}

module.exports = RegisterController