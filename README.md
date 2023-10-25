# Desafio-CRUD
CREATE TABLE alunos (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  idade INT,
  nota_primeiro_semestre DECIMAL(4,2),
  nota_segundo_semestre DECIMAL(4,2),
  nome_professor VARCHAR(255),
  numero_sala INT
);
