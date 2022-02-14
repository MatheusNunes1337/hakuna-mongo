const NotFound = require('../errors/NotFound')
const GroupRepository = require('../repositories/GroupRepository')
const transformFilterToRegex = require('../utils/transformFilterToRegex')

class GroupService {
    findAll({offset, limit, ...filter}) {
        filter = transformFilterToRegex(filter)
        return GroupRepository.getAll(filter, offset, limit)
    }

    async findById(id) {
        const group = await GroupRepository.getById(id)
    
        if(!group) throw new NotFound('Group')

        return group
    }
}


module.exports = new GroupService()