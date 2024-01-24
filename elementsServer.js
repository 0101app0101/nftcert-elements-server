require('dotenv').config()
require('./utils')

const fs = require('fs')
const path = require('path')
const express = require('express')
const multerConfig = require('./multerConfig')
const mysqlConfig = require('./mysqlConfig')

const app = express()

app.use('/element/svg/file', express.static(path.join(__dirname, process.env.USERS_PATH, process.env.TEST_USER_ID, process.env.ELEMENTS_PATH, process.env.SVG)))

app.get('/', (req, res) => {
    res.send('file server is UP')
})

app.post('/elements', multerConfig.upload.array(process.env.FILE_UPLOAD_FIELD_NAME, process.env.FILE_UPLOAD_LIMIT), (req, res, next) => {

    req.files.forEach(x => {
        mysqlConfig.db.query(process.env.ADD_FILE_TO_DB.format(x.filename, x.originalname, process.env.TEST_USER_ID), function (error, results, fields) {
            if (error) throw error
        })
    })

    res.send(req.files)
})

app.get('/elements', async (req, res) => {

    let elements = {
        svg: []
    }
    const svg = async () => await fs.promises.readdir(path.join(__dirname, process.env.USERS_PATH, process.env.TEST_USER_ID, process.env.ELEMENTS_PATH, process.env.SVG))
    await svg().then(x => elements.svg = x)

    res.send(elements)
})

app.get('/element/svg/xml/:fileName', async (req, res) => {


    const svg = async () => await fs.promises.readFile(
        path.join(__dirname, process.env.USERS_PATH, process.env.TEST_USER_ID, process.env.ELEMENTS_PATH, process.env.SVG, req.params.fileName),
        'utf8',
        function (err, contents) {
            const end_tokens = contents.split("</Svg>");
            end_tokens.map(token => {
                return token.split("<Svg ")[1]
            });
        })

    svg().then(x => { res.setHeader('Content-Type', 'text/svg+xml'); res.send(x) })

})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`file server running on port: ${process.env.SERVER_PORT}`)
})