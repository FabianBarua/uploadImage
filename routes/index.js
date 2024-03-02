const uploadController = require('../controllers/upload')

const express = require('express')
const router = express.Router()

module.exports = function () {
  router.get('/', (req, res) => {
    res.render('index')
  })

  router.post(
    '/upload',
    uploadController.upload.single('image'),
    uploadController.uploadImage
  )

  return router
}
