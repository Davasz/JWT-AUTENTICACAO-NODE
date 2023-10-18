const express = require('express')
require('dotenv').config({path: '.env'})


const app = express()
const port = process.env.APP_PORT || 3000

app.get('/', (req, res) => {
    res.status(200).json({msg: "Bem-vindo à API!"})
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
