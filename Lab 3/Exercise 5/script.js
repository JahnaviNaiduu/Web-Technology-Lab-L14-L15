let currentStage = 0;
const stages = document.querySelectorAll(".stage");
const progressBar = document.getElementById("progressBar");

// 6️⃣ Temporary storage
let formData = {
  name: "",
  email: "",
  password: ""
};

// Show stage
function showStage(index) {
  stages.forEach(stage => stage.classList.remove("active"));
  stages[index].classList.add("active");
  progressBar.style.width = ((index + 1) / stages.length) * 100 + "%";
}

// 2️⃣ Next stage with validation
function nextStage() {
  if (validateStage(currentStage)) {
    saveData(currentStage);
    currentStage++;
    showStage(currentStage);
  }
}

// Previous stage
function prevStage() {
  currentStage--;
  showStage(currentStage);
}

// 1️⃣ Stage-wise validation
function validateStage(stage) {
  let valid = true;

  if (stage === 0) {
    const name = document.getElementById("name").value.trim();
    document.getElementById("nameError").innerText = "";
    if (name === "") {
      document.getElementById("nameError").innerText = "Name is required";
      valid = false;
    }
  }

  if (stage === 1) {
    const email = document.getElementById("email").value.trim();
    document.getElementById("emailError").innerText = "";
    if (!email.includes("@")) {
      document.getElementById("emailError").innerText = "Valid email required";
      valid = false;
    }
  }

  if (stage === 2) {
    const password = document.getElementById("password").value;
    document.getElementById("passwordError").innerText = "";
    if (password.length < 6) {
      document.getElementById("passwordError").innerText =
        "Password must be at least 6 characters";
      valid = false;
    }
  }

  return valid;
}

// 6️⃣ Save data
function saveData(stage) {
  if (stage === 0) formData.name = name.value;
  if (stage === 1) formData.email = email.value;
  if (stage === 2) formData.password = password.value;
}

// 5️⃣ Prevent submission if invalid
document.getElementById("multiForm").addEventListener("submit", function (e) {
  if (!validateStage(2)) {
    e.preventDefault();
  } else {
    alert("✅ Form submitted successfully!");
    console.log(formData);
  }
});

// Initial load
showStage(currentStage);
