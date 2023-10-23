const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Agora o arquivo está na mesma pasta
const mysql = require('mysql2'); // Importe a biblioteca MySQL

const app = express();
app.use(express.json()); // Para processar o corpo das solicitações em formato JSON

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost', // Endereço do servidor MySQL
    user: 'root', // Nome de usuário do MySQL (no seu caso, 'root')
    password: 'Ren@scer89', // Senha do MySQL (no seu caso, 'Ren@scer89')
    database: 'escola', // Nome do banco de dados (o mesmo que você criou)
  });  

connection.connect((err) => {
  if (err) {
    console.error('Erro de conexão ao banco de dados:', err);
    return;
  }
  console.log('Conexão ao banco de dados MySQL estabelecida.');
});

// Middleware para servir a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Listar todos os alunos (GET)
app.get('/alunos', (req, res) => {
  // Use SQL para consultar o banco de dados e obter todos os alunos
  connection.query('SELECT * FROM alunos', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao buscar alunos.' });
    } else {
      res.json(results);
    }
  });
});

// Recuperar um aluno por ID (GET)
app.get('/alunos/:id', (req, res) => {
  const alunoId = req.params.id;
  // Use SQL para consultar o banco de dados e obter o aluno com o ID correspondente
  connection.query('SELECT * FROM alunos WHERE id = ?', [alunoId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao buscar aluno.' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Aluno não encontrado.' });
    } else {
      res.json(results[0]);
    }
  });
});

// Criar um novo aluno (POST)
app.post('/alunos', (req, res) => {
  const novoAluno = req.body;
  // Use SQL para inserir o novo aluno no banco de dados
  connection.query('INSERT INTO alunos SET ?', novoAluno, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao criar aluno.' });
    } else {
      res.json({ message: 'Aluno criado com sucesso.' });
    }
  });
});

// Atualizar um aluno por ID (PUT)
app.put('/alunos/:id', (req, res) => {
  const alunoId = req.params.id;
  const dadosAtualizados = req.body;
  // Use SQL para atualizar o aluno com o ID correspondente usando os dados fornecidos em 'dadosAtualizados'.
  connection.query('UPDATE alunos SET ? WHERE id = ?', [dadosAtualizados, alunoId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao atualizar aluno.' });
    } else {
      res.json({ message: 'Aluno atualizado com sucesso.' });
    }
  });
});

// Excluir um aluno por ID (DELETE)
app.delete('/alunos/:id', (req, res) => {
  const alunoId = req.params.id;
  // Use SQL para excluir o aluno com o ID correspondente.
  connection.query('DELETE FROM alunos WHERE id = ?', [alunoId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao excluir aluno.' });
    } else {
      res.json({ message: 'Aluno excluído com sucesso.' });
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
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
