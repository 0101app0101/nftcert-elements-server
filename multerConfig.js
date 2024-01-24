require('dotenv').config()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, process.env.USERS_PATH, process.env.TEST_USER_ID, process.env.ELEMENTS_PATH, process.env.SVG))
        },

        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '-' + file.originalname)
        }
    })





module.exports = { upload: multer({ storage: storage }) }