const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Agora o arquivo está na mesma pasta
// const mysql = require('mysql2'); // Importe a biblioteca MySQL
const { Pool } = require('pg'); // Importe a biblioteca PostgreSQL

const app = express();
app.use(express.json()); // Para processar o corpo das solicitações em formato JSON

// Configuração da conexão com o MySQL
// const connection = mysql.createConnection({
// host: 'localhost', // Endereço do servidor MySQL
//  port: 3306, // Porta do servidor MySQL (substitua pela porta desejada)
//  user: 'root', // Nome de usuário do MySQL
//  password: 'Ren@scer89', // Senha do MySQL
//  database: 'escola', // Nome do banco de dados
// }); 

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});


// connection.connect((err) => {
//   if (err) {
//     console.error('Erro de conexão ao banco de dados:', err);
//     return;
//   }
//   console.log('Conexão ao banco de dados MySQL estabelecida.');
// });

// Middleware para servir a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Listar todos os alunos
 *     description: Retorna a lista de todos os alunos na escola.
 *     responses:
 *       200:
 *         description: Lista de alunos recuperada com sucesso.
 */
app.get('/alunos', (req, res) => {
  // Use SQL para consultar o banco de dados e obter todos os alunos
  pool.query('SELECT * FROM alunos', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao buscar alunos.' });
    } else {
      res.json(results.rows);
    }
  });
});

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     summary: Recuperar um aluno por ID
 *     description: Recupera um aluno com base no ID fornecido.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno recuperado com sucesso.
 *       404:
 *         description: Aluno não encontrado.
 */
app.get('/alunos/:id', (req, res) => {
  const alunoId = req.params.id;
  // Use SQL para consultar o banco de dados e obter o aluno com o ID correspondente
  pool.query('SELECT * FROM alunos WHERE id = $1', [alunoId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao buscar aluno.' });
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: 'Aluno não encontrado.' });
    } else {
      res.json(results.rows[0]);
    }
  });
});

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Criar um novo aluno
 *     description: Cria um novo aluno com os dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'  # Certifique-se de que esteja correto e corresponda ao seu esquema de dados
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso.
 *       500:
 *         description: Erro ao criar aluno.
 */
app.post('/alunos', (req, res) => {
  const novoAluno = req.body;
  // Use SQL para inserir o novo aluno no banco de dados PostgreSQL
  const query = 'INSERT INTO alunos (id, nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala) VALUES ($1, $2, $3, $4, $5, $6, $7)';
  const values = [
    novoAluno.id,
    novoAluno.nome,
    novoAluno.idade,
    novoAluno.nota_primeiro_semestre,
    novoAluno.nota_segundo_semestre,
    novoAluno.nome_professor,
    novoAluno.numero_sala
  ];

  pool.query(query, values, (error) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao criar aluno.' });
    } else {
      res.status(201).json({ message: 'Aluno criado com sucesso.' });
    }
  });
});

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualizar um aluno por ID
 *     description: Atualiza um aluno com base no ID fornecido e os dados fornecidos.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'  # Certifique-se de que esteja correto e corresponda ao seu esquema de dados
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso.
 *       500:
 *         description: Erro ao atualizar aluno.
 */
app.put('/alunos/:id', (req, res) => {
  const alunoId = req.params.id;
  const dadosAtualizados = req.body;
  // Use SQL para atualizar o aluno com o ID correspondente usando os dados fornecidos em 'dadosAtualizados'.
  const query = 'UPDATE alunos SET nome = $2, idade = $3, nota_primeiro_semestre = $4, nota_segundo_semestre = $5, nome_professor = $6, numero_sala = $7 WHERE id = $1';
  const values = [
    alunoId,
    dadosAtualizados.nome,
    dadosAtualizados.idade,
    dadosAtualizados.nota_primeiro_semestre,
    dadosAtualizados.nota_segundo_semestre,
    dadosAtualizados.nome_professor,
    dadosAtualizados.numero_sala
  ];

  pool.query(query, values, (error) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao atualizar aluno.' });
    } else {
      res.json({ message: 'Aluno atualizado com sucesso.' });
    }
  });
});

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Excluir um aluno por ID
 *     description: Exclui um aluno com base no ID fornecido.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno excluído com sucesso.
 *       500:
 *         description: Erro ao excluir aluno.
 */
app.delete('/alunos/:id', (req, res) => {
  const alunoId = req.params.id;
  // Use SQL para excluir o aluno com o ID correspondente.
  pool.query('DELETE FROM alunos WHERE id = $1', [alunoId], (error) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao excluir aluno.' });
    } else {
      res.json({ message: 'Aluno excluído com sucesso.' });
    }
  });
});


const PORT = process.env.PORT || 3000;  // Use a porta fornecida pelo Heroku ou 3000 como padrão para desenvolvimento local
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

process.on('exit', () => {
  connection.end((err) => {
    if (err) {
      console.error('Erro ao fechar a conexão com o banco de dados:', err);
    } else {
      console.log('Conexão ao banco de dados MySQL encerrada.');
    }
  });
});
