const yup = require('yup')
const redis = require('../config/redis')
const { UserService, SessionService } = require('../services')

class SessionController {
    static async login(req, res) {
        try {
            const schema = yup.object().shape({
                email: yup.string().email().required(),
                password: yup.string().min(6).required()
            })
            
            if(!(await schema.isValid(req.body))) {
                throw { status: 400, message: 'Validation fails'}
            }
            
            const user = await UserService.getUserByEmail(req.body.email)

            if(await SessionService.isBlockedToGetToken(user.id)) {
               throw { status: 401, message: 'Numero de tentativas excedido, espere alguns instantes' }
            }
            
            
            if(!user || !UserService.checkPassword(user.password, req.body.password)) {
                const msg = await SessionService.verifyLoginCount(user)
                throw { status: 401, message: msg || 'Credenciais inválidas'}
            }

            const token = SessionService.create(user)
            
            res.status(200).json({ token })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({ error: error.message || 'Server Error'})
        }
    }
}

module.exports = SessionController