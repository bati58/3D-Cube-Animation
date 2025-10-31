const cube = document.querySelector(".cube");
const faces = document.querySelectorAll(".face");

let paused = false;
let manualRotation = false;
let rotationX = 0;
let rotationY = 0;

// 🖱️ Pause/resume on click
cube.addEventListener("click", () => {
  paused = !paused;
  cube.style.animationPlayState = paused ? "paused" : "running";
});

// 🖱️ Manual rotation with mouse
document.addEventListener("mousemove", (e) => {
  if (!manualRotation) return;
  rotationY = (e.clientX / window.innerWidth) * 360;
  rotationX = (e.clientY / window.innerHeight) * 360;
  cube.style.animation = "none";
  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
});

// 🧠 Toggle manual mode with keyboard (M key)
document.addEventListener("keydown", (e) => {
  if (e.key === "m") {
    manualRotation = !manualRotation;
    cube.style.animation = manualRotation
      ? "none"
      : "cubeRotate 6s infinite linear";
  }

  // 🧠 Rotate with arrow keys
  if (manualRotation) {
    if (e.key === "ArrowUp") rotationX -= 10;
    if (e.key === "ArrowDown") rotationX += 10;
    if (e.key === "ArrowLeft") rotationY -= 10;
    if (e.key === "ArrowRight") rotationY += 10;
    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  }
});

// 🎨 Change glow color with input (optional)
const colorInput = document.createElement("input");
colorInput.type = "color";
colorInput.style.position = "absolute";
colorInput.style.top = "20px";
colorInput.style.left = "20px";
document.body.appendChild(colorInput);

colorInput.addEventListener("input", () => {
  faces.forEach((face) => {
    face.style.borderColor = colorInput.value;
    face.style.boxShadow = `0 0 20px ${colorInput.value}`;
  });
});

// 🖱️ Hover effect
faces.forEach((face) => {
  face.addEventListener("mouseenter", () => {
    face.style.background = "rgba(255, 255, 255, 0.2)";
  });
  face.addEventListener("mouseleave", () => {
    face.style.background = "rgba(0, 0, 0, 0.6)";
  });
});

// 🧠 Timed label change
setInterval(() => {
  const labels = ["FRONT", "BACK", "RIGHT", "LEFT", "TOP", "BOTTOM"];
  faces.forEach((face, i) => {
    face.textContent = labels[i] + " " + Math.floor(Math.random() * 100);
  });
}, 5000);
