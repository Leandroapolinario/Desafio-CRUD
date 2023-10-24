const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Alunos API',
      version: '1.0.0',
      description: 'API para gerenciar alunos em uma escola',
    },
  },
  apis: ['app.js'],
};

const swaggerSpec = swaggerJsdoc(options);

// Salve o conteúdo do JSON em um arquivo swagger.json
fs.writeFileSync('swagger.json', JSON.stringify(swaggerSpec, null, 2));

console.log('swagger.json gerado com sucesso.');
