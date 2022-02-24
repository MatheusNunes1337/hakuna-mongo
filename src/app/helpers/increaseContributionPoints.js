const UserRepository = require('../repositories/UserRepository')

const increaseContributionPoints = async (userId) => {
    const { contributionPoints } = await UserRepository.getById(userId)
    const updatedPoints = contributionPoints + 50
    
    return UserRepository.update(userId, { contributionPoints: updatedPoints })
}

module.exports = increaseContributionPoints