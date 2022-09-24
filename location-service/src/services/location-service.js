const { locationAPI } = require('../config/api')

class LocationService {
    static async  getLocationById(id) {
        const { data } =  await locationAPI.get(`/${id}`)
        return data
    }
}

module.exports = LocationService