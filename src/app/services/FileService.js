const FileRepository = require("../repositories/FileRepository")

class FileService {
    delete({ key }) {
        return FileRepository.delete(key)
    }
}

module.exports = new FileService()