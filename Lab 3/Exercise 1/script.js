const form = document.getElementById("regForm");
const role = document.getElementById("role");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const skills = document.getElementById("skills");

// Show / Hide Skills Field
role.addEventListener("change", () => {
  if (role.value === "teacher") {
    skills.classList.remove("hidden");
  } else {
    skills.classList.add("hidden");
  }
});

// Email Domain Validation
function validateEmail() {
  const domain = email.value.split("@")[1];
  if (domain !== "gmail.com" && domain !== "edu.in") {
    email.classList.add("error");
    document.getElementById("emailError").innerText = "Invalid email domain";
    return false;
  }
  email.classList.remove("error");
  document.getElementById("emailError").innerText = "";
  return true;
}

// Password Strength Validation
function validatePassword() {
  let pass = password.value;
  let regex;

  if (role.value === "admin") {
    regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  } else {
    regex = /.{6,}/;
  }

  if (!regex.test(pass)) {
    password.classList.add("error");
    document.getElementById("passError").innerText =
      "Weak password for selected role";
    return false;
  }

  password.classList.remove("error");
  document.getElementById("passError").innerText = "";
  return true;
}

// Confirm Password Check
function validateConfirmPassword() {
  if (password.value !== confirmPassword.value) {
    confirmPassword.classList.add("error");
    document.getElementById("confirmError").innerText =
      "Passwords do not match";
    return false;
  }

  confirmPassword.classList.remove("error");
  document.getElementById("confirmError").innerText = "";
  return true;
}

// Real-time Validation
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);

// Prevent Submission if Invalid
form.addEventListener("submit", (e) => {
  if (!validateEmail() || !validatePassword() || !validateConfirmPassword()) {
    e.preventDefault();
    alert("Please fix validation errors");
  }
});
