const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.substring(file.originalname.lastIndexOf("."))
    cb(null, file.fieldname + '-' + uuidv4() + ext)
  },
})

module.exports = store = multer({ storage })