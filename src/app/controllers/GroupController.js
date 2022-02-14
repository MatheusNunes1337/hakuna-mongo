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
}

module.exports = new GroupController()