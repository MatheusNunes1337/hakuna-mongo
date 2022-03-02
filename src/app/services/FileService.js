const FileRepository = require("../repositories/FileRepository")

class FileService {
    delete({ key }) {
        return FileRepository.delete(key)
    }

    download({ key }) {
        return FileRepository.download(key)
    }
}

module.exports = new FileService()