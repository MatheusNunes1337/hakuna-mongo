const GenericRepository = require("./GenericRepository");
const GroupSchema = require('../schemas/GroupSchema')

class GroupRepository extends GenericRepository {
    constructor() {
        super(GroupSchema)
    }
}

module.exports = new GroupRepository()