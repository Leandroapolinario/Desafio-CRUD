const swaggerJsdoc = require('swagger-jsdoc');

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
  connection.query('SELECT * FROM alunos', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao buscar alunos.' });
    } else {
      res.json(results);
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
  // Use SQL para inserir o novo aluno no banco de dados
  connection.query('INSERT INTO alunos SET ?', novoAluno, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao criar aluno.' });
    } else {
      res.json({ message: 'Aluno criado com sucesso.' });
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
  connection.query('UPDATE alunos SET ? WHERE id = ?', [dadosAtualizados, alunoId], (error, results) => {
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
  connection.query('DELETE FROM alunos WHERE id = ?', [alunoId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao excluir aluno.' });
    } else {
      res.json({ message: 'Aluno excluído com sucesso.' });
    }
  });
});

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;