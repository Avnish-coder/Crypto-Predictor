const mysql = require("mysql")

const db = mysql.createPool({
              host : "localhost",
              user : "root",
              password : "",
              // connnectionLimit : 40,
              database : "cryptoPredictor"
})

module.exports = {
              db
}