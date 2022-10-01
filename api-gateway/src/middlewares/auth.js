const jwt = require('jsonwebtoken')

const rolesEnum = {
    CHAR_SERVICE: ['/list-characters'],
    LOCATION_SERVICE: ['/location-by-id']
}

module.exports = (req, res, next) => {
    console.log(req.path)
    const bearer = req.headers['authorization'] 

    if(!bearer) {
        return res.status(401).send('Unauthorized')
    }

    const [, token] = bearer.split(' ')


    try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const { roles } = user

        roles.forEach(role => {
            if(!(rolesEnum[role] && rolesEnum[role].includes(req.path))) {
               throw { status: 403, message: 'Forbbiden'}
            }
        });
        
        next()
    } catch (error) {
        console.log(error)
        return res.status(error.status || 401).json({ message: error.message || 'Unauthorized'})
    }
}