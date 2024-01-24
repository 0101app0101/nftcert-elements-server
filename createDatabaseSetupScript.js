require('dotenv').config()
var mysql = require('mysql2')

var db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
})

db.connect(function (err) {
    if (err) throw new Error("Error connecting to mysql server")
    console.log("Connected to mysql server")
})

db.query(process.env.CREATE_DATABASE_IF_NOT_EXISTS, function (error, results, fields) {
    if (error) throw new Error("Error creating database")
    console.log("created Database")
})

db.query(process.env.USE_DATABASE, function (error, results, fields) {
    if (error) throw new Error("Error using database")
    console.log("using Database")
})

db.query(process.env.CREATE_TABLE_IF_NOT_EXISTS, function (error, results, fields) {
    if (error) throw new Error("Error creating table")
    console.log("created Table")
})

db.end()