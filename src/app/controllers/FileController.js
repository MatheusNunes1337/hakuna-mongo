const FileService = require("../services/FileService")

class FileController {
    async delete(req, res) {
        await FileService.delete(req.params)
        return res.status(204).end()
    }

    async download(req, res) {
        const fileUrl = await FileService.download(req.params)
        return res.status(200).send(fileUrl)
    }
}

module.exports = new FileController()