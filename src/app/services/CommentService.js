const NotFound = require('../errors/NotFound')
const CommentRepository = require('../repositories/CommentRepository')

class CommentService {
    getAll(postId) {
        return CommentRepository.getAll(postId)
    }

    async findById({postId, id}) {
        const comment = await CommentRepository.getById(id, postId)
        if(!comment) throw new NotFound('Comment')
        
        return comment
    }
}

module.exports = new CommentService()