const express = require('express')
const UserController = require('../controllers/UserController')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ msg: "Bem-vindo à API!" })
})

// Cadastrar usuário
router.post('/auth/register', async (req, res) => {
    try {
        await UserController.saveUser(req, res)
    } catch (error) {
        res.status(500).json({ msg: "Aconteceu um erro no servidor!" });
    }
})

// Logar usuário
router.post('/auth/login', async (req, res) => {
    try {
        await UserController.loginUser(req, res)
    } catch (error) {
        res.status(500).json({ msg: "Aconteceu um erro no servidor!" });
    }
})


module.exports = router