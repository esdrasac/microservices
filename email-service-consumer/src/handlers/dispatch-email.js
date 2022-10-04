const nodemailer = require('nodemailer')

module.exports = async (msg) => {
    const transport = nodemailer.createTransport({
        host: 'localhost',
        port: 1025
    })

    return await transport.sendMail(msg)
}