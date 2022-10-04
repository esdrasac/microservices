const RabbitMQ = require('../config/rabbitmq')

class EnqueueService {
    static async enqueue(user) {
        const msg = {
            from: 'Equipe Lets Code <support@lets.com>',
            to: user.email,
            subject: 'Confirmação de email',
            text: `Olá ${user.name} Clique no link abaixo para confirmar seu email\n -> https://link-lets-code.com.br/confirmation`
        }

        return RabbitMQ.sendMessage(JSON.stringify(msg))
    }
}

module.exports = EnqueueService

