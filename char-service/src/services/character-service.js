const { characterAPI } = require('../config/api')
class CharacterService {
    static async getChars(page) {
        const { data } =  await characterAPI.get('', { params: { page }})

        const chars =  data.results.map(char => {
            return {
                id: char.id,
                name: char.name,
                status: char.status,
                species: char.species,
                gender: char.gender,
                locationId: char.location.url.split('/').pop()
            }
        })

        return chars
    }
}

module.exports = CharacterService