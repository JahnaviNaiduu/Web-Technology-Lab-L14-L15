const taskInput = document.getElementById("taskName");
const addTaskBtn = document.getElementById("addTaskBtn");
const statusMessage = document.getElementById("statusMessage");

const todoColumn = document.getElementById("todoColumn");
const inProgressColumn = document.getElementById("inProgressColumn");
const completedColumn = document.getElementById("completedColumn");

let dragSourceId = null;
let taskIdCounter = 0;

// Format date as DD-MM-YYYY
function formatDate(date) {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

// Create a new task card
function createTaskCard(title) {
  const card = document.createElement("div");
  card.className = "task-card";
  card.draggable = true;
  card.id = `task-${++taskIdCounter}`;

  const nameEl = document.createElement("div");
  nameEl.className = "task-title";
  nameEl.textContent = title;

  const dateEl = document.createElement("div");
  dateEl.className = "task-date";
  dateEl.textContent = formatDate(new Date());

  card.appendChild(nameEl);
  card.appendChild(dateEl);

  // drag events
  card.addEventListener("dragstart", (e) => {
    dragSourceId = card.id;
    e.dataTransfer.setData("text/plain", card.id);
  });

  card.addEventListener("dragend", () => {
    dragSourceId = null;
  });

  return card;
}

// Add Task button handler
addTaskBtn.addEventListener("click", () => {
  const title = taskInput.value.trim();
  if (!title) {
    statusMessage.textContent = "Please enter a task name.";
    statusMessage.style.color = "#b91c1c";
    return;
  }

  const card = createTaskCard(title);
  todoColumn.appendChild(card);
  taskInput.value = "";
  statusMessage.textContent = "";
});

// Allow dropping into each column body
[todoColumn, inProgressColumn, completedColumn].forEach((col) => {
  col.addEventListener("dragover", (e) => {
    e.preventDefault(); // needed to allow drop [web:48][web:51]
    col.classList.add("over");
  });

  col.addEventListener("dragleave", () => {
    col.classList.remove("over");
  });

  col.addEventListener("drop", (e) => {
    e.preventDefault();
    col.classList.remove("over");

    const id = e.dataTransfer.getData("text/plain") || dragSourceId;
    if (!id) return;

    const card = document.getElementById(id);
    if (!card) return;

    col.appendChild(card);

    // If dropped into Completed
    if (col === completedColumn) {
      card.classList.add("completed");
      statusMessage.textContent = "Task Completed Successfully";
      statusMessage.style.color = "#16a34a";
    } else {
      card.classList.remove("completed");
      statusMessage.textContent = "";
    }
  });
});
