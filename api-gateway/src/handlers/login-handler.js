const axios = require('axios')

class LoginServices {
    static async login(req, res) {
        try {
            const { data } = await axios.post(`${process.env.LOGIN_SERVICE_URL}/login`, req.body)

            return res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(error?.response?.status || 500).json({ error: error?.response?.data?.error || 'Server error' })
        }
    }
}

module.exports = LoginServices