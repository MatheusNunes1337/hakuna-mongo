const Forbidden = require('../../errors/Forbidden');
const GroupRepository = require('../../repositories/GroupRepository');
const errorSerialize = require('../../serialize/errorSerialize');

const memberMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId
    const { groupId } = req.params
    
    const group = await GroupRepository.getById(groupId)
    if(!group) throw new NotFound('Group')
    
    const havePermission = group.members.includes(userId)

    if(!havePermission) throw new Forbidden('You have no permissions to access this resource')

    return next();
  } catch (err) {
    return res.status(403).json(errorSerialize(err));
  }
};

module.exports = memberMiddleware;