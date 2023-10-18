const express = require('express')
const db = require('./util/dbConnection')
require('dotenv').config({path: '.env'})


const app = express()
const port = process.env.APP_PORT || 3000

app.get('/', (req, res) => {
    res.status(200).json({msg: "Bem-vindo à API!"})
})

app.listen(port, () => {
    new db().connectMySQL()
    console.log(`Servidor rodando na porta ${port}`)
})
