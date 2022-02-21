const CommentRepository = require('../repositories/CommentRepository')

class CommentService {
    getAll(postId) {
        return CommentRepository.getAll(postId)
    }
}

module.exports = new CommentService()