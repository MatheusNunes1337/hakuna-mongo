const GroupService = require('../services/GroupService')

class GroupController {
    async findAll(req, res) {
        const response = await GroupService.findAll(req.query)
        return res.status(200).json(response)
    }

    async findById(req, res) {
        const {id} = req.params
        const response = await GroupService.findById(id)
        return res.status(200).json(response)
    }

    async create(req, res) {
        const response = await GroupService.create(req.body, req.userId)
        return res.status(201).json(response)
    }

    async update(req, res) {
        const { id } = req.params
        const response = await GroupService.update(req.body, id)
        return res.status(200).json(response)
    }

    async join(req, res) {
        const { id } = req.params
        await GroupService.join(id, req.userId)
        return res.status(204).end()
    }

    async addModerator(req, res) {
        const {id, userId} = req.params
        await GroupService.addModerator(id, userId)
        return res.status(204).end()
    }
}

module.exports = new GroupController()