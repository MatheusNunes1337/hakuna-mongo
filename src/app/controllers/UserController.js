const UserService = require('../services/UserService')
const { serialize, paginateSerialize } = require('../serialize/userSerialize')

class UserController {
    async findAll(req, res) {
        const response = await UserService.findAll(req.query)
        return res.status(200).json(paginateSerialize(response))
    }

    async getRanking(req, res) {
        const response = await UserService.getRanking()
        return res.status(200).json({users: response})
    }

    async findById(req, res) {
        const response = await UserService.findById(req.params)
        return res.status(200).json(serialize(response))
    }

    async create(req, res) {
        const response = await UserService.create(req.body)
        return res.status(201).json(serialize(response))
    }

    async update(req, res) {
        const { id } = req.params
        const response = await UserService.update(id, req.body, req.file)
        return res.status(200).json(serialize(response))
    }

    async delete(req, res) {
        const { id } = req.params
        await UserService.delete(id)
        return res.status(204).end()
    }
}

module.exports = new UserController()