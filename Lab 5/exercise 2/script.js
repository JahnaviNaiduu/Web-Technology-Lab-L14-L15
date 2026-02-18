let xmlDoc;

// Load XML using AJAX
function loadBooks() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            xmlDoc = xhr.responseXML;
            displayBooks();
        } else {
            showMessage("Error loading XML file", "error");
        }
    };
    xhr.send();
}

// Display books in table
function displayBooks() {
    const books = xmlDoc.getElementsByTagName("book");
    let table = `<table>
        <tr>
            <th>ID</th><th>Title</th><th>Author</th><th>Status</th>
        </tr>`;

    for (let book of books) {
        table += `
        <tr>
            <td>${book.getElementsByTagName("id")[0].textContent}</td>
            <td>${book.getElementsByTagName("title")[0].textContent}</td>
            <td>${book.getElementsByTagName("author")[0].textContent}</td>
            <td>${book.getElementsByTagName("status")[0].textContent}</td>
        </tr>`;
    }

    table += "</table>";
    document.getElementById("bookTable").innerHTML = table;
}

// Add new book
function addBook() {
    const id = bid.value.trim();
    const titleVal = title.value.trim();
    const authorVal = author.value.trim();
    const statusVal = status.value;

    if (!id || !titleVal || !authorVal) {
        showMessage("All fields are required", "error");
        return;
    }

    const book = xmlDoc.createElement("book");

    createNode(book, "id", id);
    createNode(book, "title", titleVal);
    createNode(book, "author", authorVal);
    createNode(book, "status", statusVal);

    xmlDoc.documentElement.appendChild(book);
    displayBooks();
    showMessage("Book added successfully", "success");
}

// Update availability status
function updateStatus() {
    const id = bid.value.trim();
    if (!id) {
        showMessage("Enter Book ID to update", "error");
        return;
    }

    const books = xmlDoc.getElementsByTagName("book");
    for (let book of books) {
        if (book.getElementsByTagName("id")[0].textContent === id) {
            book.getElementsByTagName("status")[0].textContent = status.value;
            displayBooks();
            showMessage("Status updated successfully", "success");
            return;
        }
    }
    showMessage("Book not found", "error");
}

// Delete book
function deleteBook() {
    const id = delId.value.trim();
    if (!id) {
        showMessage("Enter Book ID to delete", "error");
        return;
    }

    const books = xmlDoc.getElementsByTagName("book");
    for (let book of books) {
        if (book.getElementsByTagName("id")[0].textContent === id) {
            book.remove();
            displayBooks();
            showMessage("Book deleted successfully", "success");
            return;
        }
    }
    showMessage("Book not found", "error");
}

// Helper to create XML nodes
function createNode(parent, name, value) {
    const node = xmlDoc.createElement(name);
    node.textContent = value;
    parent.appendChild(node);
}

// Message display
function showMessage(text, type) {
    const msg = document.getElementById("msg");
    msg.textContent = text;
    msg.className = type;
}

// Load on start
loadBooks();
