const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({msg: "Bem-vindo à API!"})
})

router.post('/auth/register', async (req, res) => {
    const {name, email, password, confirmPassword} = req.body

    if(!name) {
        return res.status(422).json({msg : "O nome é obrigatório!"})
    }

    if(!email) {
        return res.status(422).json({msg : "O email é obrigatório!"})
    }

    if(!password) {
        return res.status(422).json({msg : "A senha é obrigatório!"})
    }

    if(password != confirmPassword) {
        return res.status(422).json({msg : "As senhas não conferem!"})
    }
})

module.exports = router