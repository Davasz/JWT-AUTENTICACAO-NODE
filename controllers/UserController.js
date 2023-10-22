const express = require('express')
const User = require('../model/User')


class UserController {
    constructor() { }

    static async saveUser(req, res) {
        const { name, email, password, confirmPassword } = req.body

        // if (!name) {
        //     return res.status(422).json({ msg: "O nome é obrigatório!" })
        // }

        // if (!email) {
        //     return res.status(422).json({ msg: "O email é obrigatório!" })
        // }

        // if (!password) {
        //     return res.status(422).json({ msg: "A senha é obrigatório!" })
        // }

        // if (password != confirmPassword) {
        //     return res.status(422).json({ msg: "As senhas não conferem!" })
        // }

        // // Verificar se o usuário existe
        // const userExists = await new User().findByEmail(email)

        // if (userExists[0]) {
        //     return res.status(422).json({ msg: "Esse email já esta sendo usado!" })
        // }

        // // Criar senha
        // const salt = await bcrypt.genSalt(8)
        // const passwordHashed = await bcrypt.hash(password, salt)

        // Criar usuário

        try {
            const userToSave = new User(name, email, password, confirmPassword)

            await userToSave.saveUser()

            return res.status(200).json({ msg: "Usuário registrado com sucesso!" });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Aconteceu um erro no servidor!" })
        }

    }
}

module.exports = UserController