const userDb = require('../../mocks/user-db.json')

class UserService {
    static async getUserByEmail(email) {
        return userDb.find(user => user.email === email)
    }

    static checkPassword(userPassword, password) {
        return userPassword === password
    }   
}

module.exports = UserService