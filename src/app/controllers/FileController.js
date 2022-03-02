const FileService = require("../services/FileService")

class FileController {
    async delete(req, res) {
        await FileService.delete(req.params)
        return res.status(204).end()
    }
}

module.exports = new FileController()