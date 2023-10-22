const dbConnection = require('../util/dbConnection')
const bcrypt = require('bcrypt')
const db = new dbConnection().connection()

class User {
   constructor(name, email, password, confirmPassword) {
      this.name = name
      this.email = email
      this.password = password
      this.confirmPassword = confirmPassword
   }

   async findByEmail(email) {
      return new Promise(async (resolve, reject) => {
         try {
            db.query('SELECT email FROM users WHERE email = ?', [email], (err, results) => {
               if (err) {
                  reject({ msg: err.sqlMessage })
               } else {
                  resolve(results)
               }
            })
         } catch (error) {
            console.log(error)
            reject({ msg: error.sqlMessage })
         }
      })
   }

   async saveUser() {
      return new Promise(async (resolve, reject) => {
         try {
            const userExists = await this.findByEmail(this.email)

            if (userExists.length > 0) {
               reject({ msg: "Esse email já está sendo usado" })
            } else {
               const salt = await bcrypt.genSalt(8)
               const passwordHashed = await bcrypt.hash(this.password, salt)
               db.query('INSERT INTO users SET ?', {
                  name: this.name,
                  email: this.email,
                  password: passwordHashed
               }, (err, result) => {
                  if (err) {
                     reject({ msg: err.sqlMessage })
                  } else {
                     resolve(result)
                  }
               })
            }
         } catch (error) {
            console.log(error)
            reject({ msg: error.sqlMessage })
         }
      })
   }

   static createFromLoginData(email, password) {
      return new User(undefined, email, password, undefined)
   }
}

module.exports = User
