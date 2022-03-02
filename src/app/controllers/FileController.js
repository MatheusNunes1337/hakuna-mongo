const FileService = require("../services/FileService")

class FileController {
    async delete(req, res) {
        await FileService.delete(req.params)
        return res.status(204).end()
    }

    async download(req, res) {
        const file = await FileService.download(req.params)
        return res.status(200).send(file)
    }
}

module.exports = new FileController()