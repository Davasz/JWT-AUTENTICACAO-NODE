const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

/**
* @swagger
* /:
*   get:
*     summary: Rota de boas-vindas à API.
*     responses:
*       '200':
*         description: Mensagem de boas-vindas
*/

router.get('/', (req, res) => {
   res.status(200).json({ msg: "Bem-vindo à API!" });
});

/**
* @swagger
* /auth/register:
*   post:
*     summary: Rota para cadastrar um novo usuário.
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               email:
*                 type: string
*               password:
*                 type: string
*               confirmPassword:
*                 type: string
*     responses:
*       '200':
*         description: Sucesso na criação do usuário
*       '500':
*         description: Erro do servidor
*     tags:
*       - Usuários
*/
router.post('/auth/register', async (req, res) => {
   try {
       await UserController.saveUser(req, res);
   } catch (error) {
       res.status(500).json({ msg: "Aconteceu um erro no servidor!" });
   }
});

/**
* @swagger
* /auth/login:
*   post:
*     summary: Rota para autenticar um usuário.
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string
*     responses:
*       '200':
*         description: Sucesso na autenticação
*       '500':
*         description: Erro do servidor
*     tags:
*       - Usuários
*/
router.post('/auth/login', async (req, res) => {
   try {
       await UserController.loginUser(req, res);
   } catch (error) {
       res.status(500).json({ msg: "Aconteceu um erro no servidor!" });
   }
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Rota para retornar informações de um usuário.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Informações do usuário
 *       '500':
 *         description: Erro do servidor
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Usuários
 *     description: |
 *       Esta rota requer autenticação. Certifique-se de enviar um token de autenticação no cabeçalho da solicitação.
 */
router.get('/user/:id', UserController.checkToken, async (req, res) => {
    try {
        await UserController.getUser(req, res);
    } catch (error) {
        res.status(500).json({ msg: "Aconteceu um erro no servidor!" });
    }
});


module.exports = router;
