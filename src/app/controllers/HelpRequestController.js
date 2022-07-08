const { serialize } = require("../serialize/helpRequestSerialize")
const HelpRequestService = require("../services/HelpRequestService")

class HelpRequestController {
    async getById(req, res) {
        const {id} = req.params
        const response = await HelpRequestService.getById(id)
        return res.status(200).json(serialize(response))
    }

    async create(req, res) {
        const response = await HelpRequestService.create(req.body)
        return res.status(201).json(serialize(response))
    }

    async decline(req, res) {
        const {id} = req.params
        await HelpRequestService.decline(id, req.userId)
        return res.status(204).end()
    }
}

module.exports = new HelpRequestController()