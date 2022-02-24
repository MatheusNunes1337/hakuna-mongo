const Forbidden = require('../../errors/Forbidden');
const NotFound = require('../../errors/NotFound');
const GroupRepository = require('../../repositories/GroupRepository');
const errorSerialize = require('../../serialize/errorSerialize');

const modMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId
    const { id } = req.params
    
    const group = await GroupRepository.getById(id)
    if(!group) throw new NotFound('Group')
    
    const havePermission = group.mods.find(mod => mod._id == userId)

    if(!havePermission) throw new Forbidden('You have no permissions to access this resource')

    return next();
  } catch (err) {
    let statusCode = 403
    if(err instanceof NotFound) statusCode = 404 
    return res.status(statusCode).json(errorSerialize(err));
  }
};

module.exports = modMiddleware;