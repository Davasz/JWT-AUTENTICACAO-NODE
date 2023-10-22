const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Autenticação',
      version: '1.0.0',
      description: 'Documentação da Minha API',
    },
  },
  apis: ['./router/userRouter.js'], // Especifique o caminho dos arquivos com as rotas
};

const specs = swaggerJsdoc(options);

module.exports = specs;
