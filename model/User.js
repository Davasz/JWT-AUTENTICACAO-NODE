const dbConnection = require('../util/dbConnection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = new dbConnection().connection()

class User {
   constructor(id, name, email, password, confirmPassword) {
      this.id = id
      this.name = name
      this.email = email
      this.password = password
      this.confirmPassword = confirmPassword
   }

   async findByEmail(email) {
      return new Promise(async (resolve, reject) => {
         try {
            db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
               if (err) {
                  return reject({ msg: err.sqlMessage })
               }
               return resolve(results)
            })
         } catch (error) {
            return reject({ msg: error.sqlMessage })
         }
      })
   }

   async findById(id) {
      return new Promise(async (resolve, reject) => {
         try {
            db.query('SELECT name, email FROM users WHERE id = ?', [id], (err, results) => {
               if (err) {
                  return reject({ msg: err.sqlMessage })
               }
               return resolve(results)
            })
         } catch (error) {
            return reject({ msg: error.sqlMessage })
         }
      })
   }

   async saveUser() {
      return new Promise(async (resolve, reject) => {
         try {
            const userExists = await this.findByEmail(this.email)

            if (userExists.length > 0) {
               return reject({ msg: "Esse email já está sendo usado" })
            }

            const salt = await bcrypt.genSalt(8)
            const passwordHashed = await bcrypt.hash(this.password, salt)

            db.query('INSERT INTO users SET ?', {
               name: this.name,
               email: this.email,
               password: passwordHashed
            }, (err, result) => {
               if (err) {
                  return reject({ msg: err.sqlMessage })
               }
               return resolve(result)
            })

         } catch (error) {
            return reject({ msg: error })
         }
      })
   }

   async loginUser() {
      return new Promise(async (resolve, reject) => {
         const user = await this.findByEmail(this.email);

         if (user.length === 0) {
            return reject({ msg: "Usuário não encontrado" });
         }

         const checkedPassword = await bcrypt.compare(this.password, user[0].password);

         if (!checkedPassword) {
            return reject({ msg: "Senha inválida!" });
         }

         try {
            const secret = process.env.SECRET;
            const id = user[0].id
            const token = jwt.sign(
               {
                  id
               }, secret)

            return resolve({ msg: "Usuário autenticado com sucesso!", token });
         } catch (error) {
            return reject({ msg: "Erro interno no servidor" });
         }
      });
   }

   async getUser() {

      return new Promise(async (resolve, reject) => {

         const user = await this.findById(this.id)

         if (user.length == 0) {
            return reject({ msg: "Usuário não encontrado!" })
         }

         return resolve(user)
      })
   }

   static createFromLoginData(email, password) {
      return new User(undefined, undefined, email, password, undefined)
   }
   static createFromGetData(id) {
      return new User(id, undefined, undefined, undefined, undefined)
   }
}

module.exports = User
