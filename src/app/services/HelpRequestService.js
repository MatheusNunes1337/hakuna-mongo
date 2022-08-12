const NotFound = require('../errors/NotFound')
const HelpRequestRepository = require('../repositories/HelpRequestRepository')
const getCurrentDate = require('../utils/getCurrentDate')
const getCurrentTime = require('../utils/getCurrentTime')

class helpRequestService {
    async getById(id) {
        const helpRequest = await HelpRequestRepository.getById(id)
        if(!helpRequest) throw new NotFound('Help Request')

        return helpRequest
    }

    async create(payload) {
        return HelpRequestRepository.create(payload)
    }

    async cancel(id) {
        return HelpRequestRepository.cancel(id)
    }

    async decline(id, userId) {
        //const helpRequest = await HelpRequestRepository.getById(id)
        //if(!helpRequest) throw new NotFound('Help Request')
        return HelpRequestRepository.decline(id, userId)
    }
}

module.exports = new helpRequestService()