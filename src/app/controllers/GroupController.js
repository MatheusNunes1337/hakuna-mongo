const GroupService = require('../services/GroupService')

class GroupController {
    async findAll(req, res) {
        const response = await GroupService.findAll(req.query)
        return res.status(200).json(response)
    }
}

module.exports = new GroupController()