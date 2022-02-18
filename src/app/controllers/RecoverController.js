const RecoverService = require("../services/RecoverService")

class RecoverController {
    async recoverPassword(req, res) {
        const { email } = req.params
        const { password } = req.body
        const response = await RecoverService.recoverPassword(email, password)
        return res.status(200).json(response)
    }
}

module.exports = new RecoverController()