let students = [];

const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");

function renderTable() {
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.dept}</td>
                <td>${student.marks}</td>
                <td>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const student = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        dept: document.getElementById("dept").value,
        marks: document.getElementById("marks").value
    };

    students.push(student);
    renderTable();
    form.reset();
});

function deleteStudent(index) {
    students.splice(index, 1);
    renderTable();
}
