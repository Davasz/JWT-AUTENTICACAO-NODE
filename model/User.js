const dbConnection = require('../util/dbConnection')
const db = new dbConnection().connection()

class User {
    constructor(name, email, password, confirmPassword) {
        this.name = name;
        this.email = email
        this.password = password 
        this.confirmPassword = confirmPassword 
     }

     teste() {
        db.query()
     }
}