const mysql = require("mysql2")

const pool = mysql.createPool({
    host:"localhost",
    port:"3333",
    user:"root",
    database:"karya_ibu",
    password:"yoursecret"
})

module.exports = pool.promise()