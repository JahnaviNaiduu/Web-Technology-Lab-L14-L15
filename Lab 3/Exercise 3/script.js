// 1️⃣ Survey Questions Structure
const questions = [
  {
    id: "name",
    text: "Your Name",
    type: "text",
    required: true,
    maxLength: 20
  },
  {
    id: "gender",
    text: "Gender",
    type: "radio",
    required: true,
    options: ["Male", "Female", "Other"]
  },
  {
    id: "skills",
    text: "Skills (Select at least 1)",
    type: "checkbox",
    required: true,
    minSelect: 1,
    options: ["HTML", "CSS", "JavaScript"]
  }
];

// 2️⃣ Dynamically Generate Form
const surveyDiv = document.getElementById("survey");

questions.forEach(q => {
  const div = document.createElement("div");
  div.className = "question";

  let html = `<label>${q.text}</label>`;

  if (q.type === "text") {
    html += `<input type="text" id="${q.id}">`;
  }

  if (q.type === "radio") {
    q.options.forEach(opt => {
      html += `
        <label>
          <input type="radio" name="${q.id}" value="${opt}">
          ${opt}
        </label>`;
    });
  }

  if (q.type === "checkbox") {
    q.options.forEach(opt => {
      html += `
        <label>
          <input type="checkbox" name="${q.id}" value="${opt}">
          ${opt}
        </label>`;
    });
  }

  html += `<div class="error" id="${q.id}-error"></div>`;
  div.innerHTML = html;
  surveyDiv.appendChild(div);
});

// 3️⃣ Validation Function
function validateSurvey() {
  let isValid = true;

  questions.forEach(q => {
    const error = document.getElementById(`${q.id}-error`);
    error.textContent = "";

    // TEXT
    if (q.type === "text") {
      const value = document.getElementById(q.id).value.trim();
      if (q.required && value === "") {
        error.textContent = "This field is required";
        isValid = false;
      } else if (value.length > q.maxLength) {
        error.textContent = `Maximum ${q.maxLength} characters allowed`;
        isValid = false;
      }
    }

    // RADIO
    if (q.type === "radio") {
      const selected = document.querySelector(`input[name="${q.id}"]:checked`);
      if (q.required && !selected) {
        error.textContent = "Please select an option";
        isValid = false;
      }
    }

    // CHECKBOX
    if (q.type === "checkbox") {
      const selected = document.querySelectorAll(`input[name="${q.id}"]:checked`);
      if (q.required && selected.length < q.minSelect) {
        error.textContent = `Select at least ${q.minSelect} option(s)`;
        isValid = false;
      }
    }
  });

  return isValid;
}

// 4️⃣ Submit Handler – FINAL FIX
document.getElementById("surveyForm").addEventListener("submit", function (e) {
  if (!validateSurvey()) {
    e.preventDefault(); // ❌ stop only when invalid
  } else {
    alert("✅ Survey Submitted Successfully!");
    // form submits naturally here
  }
});
