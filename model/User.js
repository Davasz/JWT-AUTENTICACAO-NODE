const dbConnection = require('../util/dbConnection')
const db = new dbConnection().connection()
const bcrypt = require('bcrypt')

class User {
   constructor(name, email, password, confirmPassword) {
      this.name = name
      this.email = email
      this.password = password
      this.confirmPassword = confirmPassword
   }

   findByEmail(email) {
      return new Promise((resolve, reject) => {
         console.log(email)
         db.query(
            'SELECT email FROM users WHERE email = ?',
            [email],
            (err, resul) => {
               if (err) {
                  reject({ msg: err.sqlMessage })
               } else {
                  resolve(resul)
               }
            }
         )
      })

   }

   saveUser() {
      return new Promise(async (resolve, reject) => {

         if (!this.name) {
            resolve({ msg: "O nome é obrigatório!" })
         }

         if (!this.email) {
            resolve({ msg: "O email é obrigatório!" })
         }

         if (!this.password) {
            resolve({ msg: "A senha é obrigatório!" })
         }

         if (this.password != this.confirmPassword) {
            resolve({ msg: "As senhas não conferem!" })
         }

         // Verificar se o usuário existe
         const userExists = await this.findByEmail(this.email);

         console.log(userExists)
         if (userExists[0]) {
            resolve({ msg: "Esse email já esta sendo usado!" })
         }

         // Criar senha
         const salt = await bcrypt.genSalt(8)
         const passwordHashed = await bcrypt.hash(this.password, salt)

         db.query(
            'INSERT INTO users SET ?',
            { name: this.name, email: this.email, password: passwordHashed },
            (err, resul) => {
               if (err) {
                  reject({ msg: err.sqlMessage })
               } else {
                  resolve(resul)
               }
            }
         )
      })
   }
}

module.exports = User