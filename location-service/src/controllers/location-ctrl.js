const yup = require('yup')
const { LocationService } = require('../services')

class LocationController {
    static async getLocationById(req, res) {
        try {
            const schema = yup.object().shape({
                locationId: yup.number().required()
            })
    
            if(!(await schema.isValid(req.query))) {
                throw { status: 400, message: 'Validation fails'}
            }

            const location = await LocationService.getLocationById(req.query.locationId)
            res.status(200).json({ message: location })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({ error: error.message || 'Server Error'})
        }
    }
}   

module.exports = LocationController