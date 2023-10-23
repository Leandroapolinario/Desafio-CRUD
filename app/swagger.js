const swaggerJsdoc = require('swagger-jsdoc');

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

const paths = {
  '/alunos': {
    get: {
      summary: 'Listar todos os alunos',
      description: 'Retorna a lista de todos os alunos na escola.',
      responses: {
        200: {
          description: 'Lista de alunos recuperada com sucesso.',
        },
      },
    },
    post: {
      summary: 'Criar um novo aluno',
      description: 'Cria um novo aluno com os dados fornecidos.',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Aluno',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Aluno criado com sucesso.',
        },
      },
    },
  },
  '/alunos/{id}': {
    get: {
      summary: 'Recuperar um aluno por ID',
      description: 'Recupera um aluno com base no ID fornecido.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        200: {
          description: 'Aluno recuperado com sucesso.',
        },
        404: {
          description: 'Aluno não encontrado.',
        },
      },
    },
    put: {
      summary: 'Atualizar um aluno por ID',
      description: 'Atualiza um aluno com base no ID fornecido e os dados fornecidos.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Aluno',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Aluno atualizado com sucesso.',
        },
      },
    },
    delete: {
      summary: 'Excluir um aluno por ID',
      description: 'Exclui um aluno com base no ID fornecido.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        200: {
          description: 'Aluno excluído com sucesso.',
        },
      },
    },
  },
};

options.paths = paths;

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;


