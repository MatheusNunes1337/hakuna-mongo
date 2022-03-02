const FileController = require('../app/controllers/FileController')

const fileRouter = require('express').Router()

fileRouter.delete('/:key', FileController.delete)

module.exports = fileRouter