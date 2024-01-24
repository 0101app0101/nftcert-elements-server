require('dotenv').config()
const fs = require('fs')
const path = require('path')

fs.mkdirSync(path.join(__dirname, process.env.USERS_PATH, process.env.TEST_USER_ID, process.env.ELEMENTS_PATH, process.env.SVG), { recursive: true })