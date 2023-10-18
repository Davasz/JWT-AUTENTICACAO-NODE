const express = require('express')
const db = require('./util/dbConnection')
require('dotenv').config({path: '.env'})


const app = express()
const port = process.env.APP_PORT || 3000

app.use(express.json())
app.use('/', require('./router/userRouter'))


app.listen(port, () => {
    new db().connectMySQL()
    console.log(`Servidor rodando na porta ${port}`)
})
