// 2️⃣ Store activity logs
let activityLog = [];
let clickCount = 0;

const logList = document.getElementById("log");
const container = document.getElementById("mainContainer");

// Utility: Log activity
function logActivity(type, target) {
  const activity = {
    type: type,
    target: target,
    time: new Date().toLocaleTimeString()
  };

  activityLog.push(activity);
  displayLog(activity);

  // 5️⃣ Suspicious activity check
  if (type === "click") {
    clickCount++;
    if (clickCount > 5) {
      showWarning("⚠️ Too many clicks detected!");
    }
  }
}

// 4️⃣ Display log dynamically
function displayLog(activity) {
  const li = document.createElement("li");
  li.textContent = `[${activity.time}] ${activity.type} on ${activity.target}`;
  logList.appendChild(li);
}

// Warning message
function showWarning(msg) {
  const li = document.createElement("li");
  li.textContent = msg;
  li.className = "warning";
  logList.appendChild(li);
}

// 1️⃣ Event Listeners

// CLICK – Bubbling phase
document.addEventListener("click", (e) => {
  logActivity("click", e.target.tagName);
});

// KEY PRESS
document.addEventListener("keydown", (e) => {
  logActivity("key press", e.key);
});

// FOCUS – Capturing phase
document.addEventListener(
  "focus",
  (e) => {
    logActivity("focus", e.target.tagName);
  },
  true // 👈 capturing enabled
);

// 6️⃣ Reset Log
document.getElementById("resetBtn").addEventListener("click", () => {
  activityLog = [];
  clickCount = 0;
  logList.innerHTML = "";
});

// 6️⃣ Export Log
document.getElementById("exportBtn").addEventListener("click", () => {
  let output = "User Activity Log:\n\n";
  activityLog.forEach(a => {
    output += `[${a.time}] ${a.type} on ${a.target}\n`;
  });

  alert(output);
});
