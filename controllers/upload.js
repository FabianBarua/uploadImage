const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const maxSize = 3 * 1024 * 1024

const uploadDir = 'public/uploads/'
exports.uploadDir = uploadDir

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueId = uuidv4()
    const extension = path.extname(file.originalname)
    cb(null, `${uniqueId}${extension}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Not an image! Please upload only images.'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize }
})

exports.upload = upload

exports.uploadImage = (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file provided')
    }

    const serverUrl = req.protocol + '://' + req.get('host')
    const imageUrl = `${serverUrl}/uploads/${req.file.filename}`
    res.json({ imageUrl })
  } catch (error) {
    let errorMessage = 'Error uploading the file.'

    if (error.message.includes('file format')) {
      errorMessage = 'Invalid file format. Please upload only images.'
    } else if (error.message.includes('No file')) {
      errorMessage = 'No file provided.'
    } else if (error instanceof multer.MulterError) {
      // Multer errors
      if (error.code === 'LIMIT_FILE_SIZE') {
        errorMessage = 'File size exceeds the limit. Please upload a smaller file.'
      } else {
        errorMessage = 'Error uploading the file.'
      }
    }

    res.status(400).json({ error: errorMessage })
  }
}
