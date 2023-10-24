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

    // Enviar os dados do aluno para a API
    fetch("http://localhost:3000/alunos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Aluno inserido com sucesso na API:", data);

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
        })
        .catch((error) => {
            console.error("Erro ao inserir aluno na API:", error);
        });
});
