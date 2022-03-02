const FileController = require('../app/controllers/FileController')

const fileRouter = require('express').Router()

fileRouter.get('/download/:key', FileController.download)
fileRouter.delete('/:key', FileController.delete)

module.exports = fileRouter