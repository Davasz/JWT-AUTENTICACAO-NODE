const dotenv = require('dotenv')
const mysql = require('mysql')
dotenv.config({ path: './.env' })

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB

})

class DBConnect {

    connection() {
       return mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB
        })
    }

    connectMySQL() {
        db.connect((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('mysql conectado com sucesso!')
            }
        })
    }
}

module.exports = DBConnect;