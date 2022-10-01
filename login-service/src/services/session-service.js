const jwt = require('jsonwebtoken')
const redisClient = require('../config/redis')
redisClient.connect()

class SessionService {
    static create(user) {
        return jwt.sign({
            id: user.id,
            roles: user.roles,
            isAdm: user.isAdm
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: 30
        })
    }

    static async isBlockedToGetToken(id) {
        const blockKey  = JSON.parse(await redisClient.get(`USER_${id}_BLOCK`))

        if (blockKey?.isBlocked) {
            return true
        }
        
        return false
    }

    static async verifyLoginCount(user) {
        const userRedis = JSON.parse(await redisClient.get(`USER_${user.id}`))
        
        if(!userRedis) {
            await redisClient.set(`USER_${user.id}`, JSON.stringify({
                count: 1,
            }), {
                EX: 60 * 5
            })

            return 'Invalid Credentials'
        } else if(userRedis.count >= 3) {
            await redisClient.set(`USER_${user.id}`, JSON.stringify({
                count: 0,
            }))
            await redisClient.set(`USER_${user.id}_BLOCK`, JSON.stringify({ isBlocked: true }), {
                EX: 10
            })

            return 'Você excedeu o numero de tentativas, espere alguns segundos'
        } else {
            await redisClient.set(`USER_${user.id}`, JSON.stringify({
                count: userRedis.count + 1,
            }))
            
            return 'Invalid Credentials'
        }
    }
}

module.exports = SessionService