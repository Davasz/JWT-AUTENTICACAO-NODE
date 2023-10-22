const express = require('express')
const db = require('./util/dbConnection')
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
require('dotenv').config({path: '.env'})


const app = express()
const port = process.env.APP_PORT || 3000

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/', require('./router/userRouter'))


app.listen(port, () => {
    new db().connectMySQL()
    console.log(`Servidor rodando na porta ${port}`)
})
