let students = [];

// Fetch JSON data
fetch("students.json")
    .then(response => response.json())
    .then(data => {
        students = data;
        displayStudents();
    })
    .catch(() => {
        showMessage("Error parsing JSON file", "error");
    });

// Display students
function displayStudents() {
    let html = `<table>
        <tr>
            <th>ID</th><th>Name</th><th>Course</th><th>Marks</th>
        </tr>`;

    students.forEach(s => {
        html += `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.course}</td>
            <td>${s.marks}</td>
        </tr>`;
    });

    html += "</table>";
    document.getElementById("table").innerHTML = html;
}

// Add student
function addStudent() {
    const id = sid.value.trim();
    const nameVal = name.value.trim();
    const courseVal = course.value.trim();
    const marksVal = marks.value.trim();

    if (!id || !nameVal || !courseVal || !marksVal) {
        showMessage("All fields are required", "error");
        return;
    }

    students.push({
        id: Number(id),
        name: nameVal,
        course: courseVal,
        marks: Number(marksVal)
    });

    displayStudents();
    showMessage("Student added successfully", "success");
}

// Update student
function updateStudent() {
    const id = sid.value.trim();

    if (!id) {
        showMessage("Enter Student ID to update", "error");
        return;
    }

    const student = students.find(s => s.id == id);
    if (!student) {
        showMessage("Student not found", "error");
        return;
    }

    if (course.value) student.course = course.value;
    if (marks.value) student.marks = Number(marks.value);

    displayStudents();
    showMessage("Student updated successfully", "success");
}

// Delete student
function deleteStudent() {
    const id = delId.value.trim();

    if (!id) {
        showMessage("Enter Student ID to delete", "error");
        return;
    }

    const index = students.findIndex(s => s.id == id);
    if (index === -1) {
        showMessage("Student not found", "error");
        return;
    }

    students.splice(index, 1);
    displayStudents();
    showMessage("Student deleted successfully", "success");
}

// Message display
function showMessage(text, type) {
    const msg = document.getElementById("msg");
    msg.textContent = text;
    msg.className = type;
}
