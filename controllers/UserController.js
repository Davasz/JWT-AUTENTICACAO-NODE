const express = require('express')
const User = require('../model/User')
const jwt = require('jsonwebtoken')

class UserController {
    constructor() { }

    static async saveUser(req, res) {
        const { name, email, password, confirmPassword } = req.body

        if (!name || !email || !password || password !== confirmPassword) {
            return res.status(422).json({ error: "Dados de usuário inválidos" })
        }

        try {
            const userToSave = new User(undefined, name, email, password, confirmPassword)
            const dataResults = await userToSave.saveUser()
            res.status(200).json({ msg: "Usuário registrado com sucesso!", dataResults })
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.msg })
        }
    }

    static async loginUser(req, res) {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(422).json({ error: "Dados de usuário inválidos" });
        }
        try {
            const userToLogin = User.createFromLoginData(email, password);
            const { msg, token } = await userToLogin.loginUser();
            res.status(200).json({ msg, token });
        } catch (error) {
            res.status(400).json({ error: error.msg });
        }
    }

    static async getUser(req, res) {
        const id = req.params.id

        try {
            const userToReturn = User.createFromGetData(id)
            const dataResults = await userToReturn.getUser()
            res.status(200).json({dataResults})
        } catch (error) {
            res.status(400).json({ error: error })
        }
    }

    static checkToken(req, res, next) {
        
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]

        if(!token) {
            return res.status(401).json({msg: "Acesso negado!"})
        }

        try {
            
            const secret = process.env.SECRET

            jwt.verify(token, secret, (err, decode) => {
                if(req.params.id == decode.id) {
                    next()
                } else {
                    throw new Error()
                }
            })
            
        } catch (error) {
            res.status(400).json({msg: "Token inválido!"})
        }
    }
}

module.exports = UserController
