const express = require('express')
const User = require('../model/User')

class UserController {
    constructor() { }

    static async saveUser(req, res) {
        const { name, email, password, confirmPassword } = req.body

        if (!name || !email || !password || password !== confirmPassword) {
            return res.status(422).json({ error: "Dados de usuário inválidos" })
        }

        try {
            const userToSave = new User(name, email, password, confirmPassword)
            const results = await userToSave.saveUser()
            res.status(200).json({ msg: "Usuário registrado com sucesso!", results })
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.msg })
        }
    }

    static async loginUser(req, res) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(422).json({ error: "Dados de usuário inválidos" })
        }
        try {
            const userToLogin = User.createFromLoginData(email, password)
            const results = await userToLogin.loginUser()
            res.status(200).json({results})
        } catch (error) {
            res.status(400).json({ error: error.msg })
        }
    }
}

module.exports = UserController
