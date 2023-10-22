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
            resolve({ msg: "O nome é obrigatório!", status: 422 })
         }

         if (!this.email) {
            reject({ msg: "O email é obrigatório!", status: 422 })
         }

         if (!this.password) {
            reject({ msg: "A senha é obrigatório!", status: 422 })
         }

         if (this.password != this.confirmPassword) {
            reject({ msg: "As senhas não conferem!", status: 422 })
         }

         // Verificar se o usuário existe
         const userExists = await this.findByEmail(this.email);
       
         if (userExists[0]) {
            reject({ msg: "Esse email já esta sendo usado!", status: 422 })
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