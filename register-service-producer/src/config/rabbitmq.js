const amqplib = require('amqplib/callback_api')

exports.sendMessage = async (message) => {
    amqplib.connect('amqp://localhost', (err, connection) => {
        if(err) {
            throw err
        }

        connection.createChannel((err, channel) => {
            if(err) {
                throw err
            }

            const queue = process.env.EMAIL_QUEUE
    
            channel.assertQueue(queue, {
            durable: false
            })
    
            channel.sendToQueue(queue, Buffer.from(message))
            console.log(" [x] Sent %s", message)
        })
    })
}