const axios = require('axios')

class LocationServices {
    static async getLocationById(req, res) {
        try {
            const location = await axios.get(`${process.env.LOCATION_SERVICE_URL}/location`, {
                params: req.query 
            })

            return res.status(200).json(location.data)
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message || 'Server error' })
        }
    }
}

module.exports = LocationServices