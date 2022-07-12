const UserRepository = require('../repositories/UserRepository')

const decreaseContributionPoints = async (userId, points) => {
    const  { contributionPoints } = await UserRepository.getById(userId)
    let updatedPoints = contributionPoints - points

    if(updatedPoints < 0) {
        updatedPoints = 0
    }
    
    return UserRepository.update(userId, { contributionPoints: updatedPoints })
}

module.exports = decreaseContributionPoints