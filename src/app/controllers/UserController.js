const NotFound = require('../errors/NotFound')
const UserService = require('../services/UserService')

class UserController {
    async findAll(req, res) {
        const response = await UserService.findAll(req.query)
        return res.status(200).json(response)
    }

    async findById(req, res) {
        const response = await UserService.findById(req.params)
        return res.status(200).json(response)
    }

    async create(req, res) {
        const response = await UserService.create(req.body)
        return res.status(201).json(response)
    }

    async update(req, res) {
        const { id } = req.params
        const response = await UserService.update(id, req.body)
        return res.status(200).json(response)
    }
}

module.exports = new UserController()