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
}

module.exports = new UserController()