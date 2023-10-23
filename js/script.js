const mysql = require('mysql2');

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost', // Endereço do servidor MySQL
    user: 'seu_usuario', // Nome de usuário do MySQL
    password: 'sua_senha', // Senha do MySQL
    database: 'escola', // Nome do banco de dados (o mesmo que você criou)
});

connection.connect((err) => {
    if (err) {
        console.error('Erro de conexão ao banco de dados:', err);
        return;
    }
    console.log('Conexão ao banco de dados MySQL estabelecida.');
});

const form = document.getElementById("student-form");
const idInput = document.getElementById("id");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const semester1Input = document.getElementById("semester1");
const semester2Input = document.getElementById("semester2");
const professorInput = document.getElementById("professor");
const roomInput = document.getElementById("room");

const studentList = document.getElementById("student-list");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = idInput.value;
    const name = nameInput.value;
    const age = ageInput.value;
    const semester1 = semester1Input.value;
    const semester2 = semester2Input.value;
    const professor = professorInput.value;
    const room = roomInput.value;

    const student = {
        id,
        name,
        age,
        semester1,
        semester2,
        professor,
        room,
    };

    const sql = "INSERT INTO alunos (id, nome, idade, nota_semestre1, nota_semestre2, nome_professor, numero_sala) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [id, name, age, semester1, semester2, professor, room];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erro ao inserir aluno no banco de dados:', err);
            return;
        }
        console.log('Aluno inserido com sucesso no banco de dados.');

        const listItem = document.createElement("li");
        listItem.textContent = `ID: ${student.id}, Nome: ${student.name}, Idade: ${student.age}, Nota 1º Semestre: ${student.semester1}, Nota 2º Semestre: ${student.semester2}, Professor: ${student.professor}, Sala: ${student.room}`;
        studentList.appendChild(listItem);

        idInput.value = "";
        nameInput.value = "";
        ageInput.value = "";
        semester1Input.value = "";
        semester2Input.value = "";
        professorInput.value = "";
        roomInput.value = "";
    });
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
