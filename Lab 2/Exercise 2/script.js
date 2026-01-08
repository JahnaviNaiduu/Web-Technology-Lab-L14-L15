// Helper to format seconds as M:SS
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m + ":" + (s < 10 ? "0" + s : s);
}

// Audio
const audio = document.getElementById("myAudio");
const audioTimeSpan = document.getElementById("audioTime");

if (audio) {
  audio.addEventListener("timeupdate", () => {
    audioTimeSpan.textContent = formatTime(audio.currentTime);
  });
}

// Video
const video = document.getElementById("myVideo");
const videoTimeSpan = document.getElementById("videoTime");

if (video) {
  video.addEventListener("timeupdate", () => {
    videoTimeSpan.textContent = formatTime(video.currentTime);
  });
}
