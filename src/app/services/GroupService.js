const GroupRepository = require('../repositories/GroupRepository')
const transformFilterToRegex = require('../utils/transformFilterToRegex')

class GroupService {
    findAll({offset, limit, ...filter}) {
        filter = transformFilterToRegex(filter)
        return GroupRepository.getAll(filter, offset, limit)
    }
}


module.exports = new GroupService()