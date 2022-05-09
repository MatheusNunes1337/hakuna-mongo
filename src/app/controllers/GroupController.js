const GroupService = require('../services/GroupService')
const {serialize, paginateSerialize} = require('../serialize/groupSerialize')

class GroupController {
    async findAll(req, res) {
        const response = await GroupService.findAll(req.query, req.userId)
        return res.status(200).json(paginateSerialize(response))
    }

    async findById(req, res) {
        const {id} = req.params
        const response = await GroupService.findById(id)
        return res.status(200).json(serialize(response))
    }

    async create(req, res) {
        const response = await GroupService.create(req.body, req.userId)
        return res.status(201).json(serialize(response))
    }

    async update(req, res) {
        const { id } = req.params
        const response = await GroupService.update(req.body, id)
        return res.status(200).json(serialize(response))
    }

    async join(req, res) {
        const { id } = req.params
        await GroupService.join(id, req.userId, req.body)
        return res.status(204).end()
    }

    async addModerator(req, res) {
        const {id, userId} = req.params
        await GroupService.addModerator(id, userId)
        return res.status(204).end()
    }

    async removeModerator(req, res) {
        const {id, userId} = req.params
        await GroupService.removeModerator(id, userId)
        return res.status(204).end()
    }

    async removeMember(req, res) {
        const {id, userId} = req.params
        await GroupService.removeMember(id, userId)
        return res.status(204).end()
    }

    async delete(req, res) {
        const { id } = req.params
        await GroupService.delete(id)
        return res.status(204).end()
    }
}

module.exports = new GroupController()