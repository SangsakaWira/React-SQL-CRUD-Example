const mysql = require("mysql2")

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    database:"users",
    password:"Forz4tano"
})

module.exports = pool.promise()