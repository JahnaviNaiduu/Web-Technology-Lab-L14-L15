let xmlDoc;

function loadEmployees() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            xmlDoc = xhr.responseXML;
            displayEmployees();
        } else {
            document.getElementById("msg").innerText = "Error loading XML";
        }
    };
    xhr.send();
}

function displayEmployees() {
    const table = document.getElementById("empTable");
    table.innerHTML = "";

    const employees = xmlDoc.getElementsByTagName("employee");

    for (let emp of employees) {
        table.innerHTML += `
            <tr>
                <td>${emp.getElementsByTagName("id")[0].textContent}</td>
                <td>${emp.getElementsByTagName("name")[0].textContent}</td>
                <td>${emp.getElementsByTagName("department")[0].textContent}</td>
                <td>${emp.getElementsByTagName("salary")[0].textContent}</td>
                <td><button onclick="deleteEmployee('${emp.getElementsByTagName("id")[0].textContent}')">Delete</button></td>
            </tr>`;
    }
}

function addEmployee() {
    if (!xmlDoc) return;

    const emp = xmlDoc.createElement("employee");

    ["id", "name", "department", "salary"].forEach(tag => {
        const el = xmlDoc.createElement(tag);
        el.textContent = document.getElementById(tag === "department" ? "dept" : tag).value;
        emp.appendChild(el);
    });

    xmlDoc.documentElement.appendChild(emp);
    displayEmployees();
    document.getElementById("msg").innerText = "Employee added successfully";
}

function deleteEmployee(id) {
    const employees = xmlDoc.getElementsByTagName("employee");
    for (let emp of employees) {
        if (emp.getElementsByTagName("id")[0].textContent === id) {
            emp.remove();
            break;
        }
    }
    displayEmployees();
}

loadEmployees();
