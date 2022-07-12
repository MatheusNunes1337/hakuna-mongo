const UserRepository = require('../repositories/UserRepository')

const increaseContributionPoints = async (userId, points) => {
    const { contributionPoints } = await UserRepository.getById(userId)
    const updatedPoints = contributionPoints + points
    
    return UserRepository.update(userId, { contributionPoints: updatedPoints })
}

module.exports = increaseContributionPoints