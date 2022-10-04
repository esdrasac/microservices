require('dotenv').config()
const amqp = require('amqplib/callback_api')
const dispatchEmail = require('./handlers/dispatch-email')
const main = async () => {
    amqp.connect('amqp://localhost', function(err, connection) {
    if (err) {
        throw err
    }

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1
        }

        const queue = process.env.EMAIL_QUEUE

        channel.assertQueue(queue, {
        durable: false
        })

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString())

            dispatchEmail(JSON.parse(msg.content))
        }, {
            noAck: true
        })
    })
})

}

main()