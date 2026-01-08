const STORAGE_KEY = "usersList";

const form = document.getElementById("userForm");
const clearAllBtn = document.getElementById("clearAllBtn");
const formMessage = document.getElementById("formMessage");
const tbody = document.getElementById("usersTableBody");

// Input fields and error spans
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const mobileError = document.getElementById("mobileError");
const passwordError = document.getElementById("passwordError");

// Load users stored in localStorage
function getUsers() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Render users table
function renderTable() {
  const users = getUsers();
  tbody.innerHTML = "";

  users.forEach((user, index) => {
    const tr = document.createElement("tr");

    const tdIndex = document.createElement("td");
    tdIndex.textContent = index + 1;

    const tdName = document.createElement("td");
    tdName.textContent = user.name;

    const tdEmail = document.createElement("td");
    tdEmail.textContent = user.email;

    const tdMobile = document.createElement("td");
    tdMobile.textContent = user.mobile;

    const tdActions = document.createElement("td");
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", () => deleteUser(user.email));
    tdActions.appendChild(delBtn);

    tr.appendChild(tdIndex);
    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdMobile);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });
}

// Delete by email
function deleteUser(email) {
  let users = getUsers();
  users = users.filter((u) => u.email !== email);
  saveUsers(users);
  renderTable();
  formMessage.textContent = "User deleted successfully.";
  formMessage.style.color = "#16a34a";
}

// Clear validation errors
function clearErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  mobileError.textContent = "";
  passwordError.textContent = "";
  formMessage.textContent = "";
}

// Validate form fields
function validateForm() {
  clearErrors();
  let valid = true;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const mobile = mobileInput.value.trim();
  const password = passwordInput.value.trim();

  if (!name) {
    nameError.textContent = "Name is required.";
    valid = false;
  }
  if (!email) {
    emailError.textContent = "Email is required.";
    valid = false;
  }
  if (!mobile) {
    mobileError.textContent = "Mobile number is required.";
    valid = false;
  } else if (!/^[0-9]{10}$/.test(mobile)) {
    mobileError.textContent = "Mobile number must be 10 digits.";
    valid = false;
  } // [web:58]

  if (!password) {
    passwordError.textContent = "Password is required.";
    valid = false;
  } else if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    valid = false;
  } // [web:61]

  return {
    valid,
    data: { name, email, mobile, password },
  };
}

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { valid, data } = validateForm();
  if (!valid) return;

  let users = getUsers();

  // Duplicate email check
  const exists = users.some(
    (u) => u.email.toLowerCase() === data.email.toLowerCase()
  );
  if (exists) {
    emailError.textContent = "This email is already registered.";
    return;
  }

  users.push(data); // store as object in array [web:55][web:57]
  saveUsers(users);
  renderTable();

  form.reset();
  formMessage.textContent = "User registered successfully.";
  formMessage.style.color = "#16a34a";
});

// Clear all users
clearAllBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  renderTable();
  formMessage.textContent = "All users cleared.";
  formMessage.style.color = "#b91c1c";
});

// Initial render on page load
renderTable();
