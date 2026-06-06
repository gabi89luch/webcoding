const PROJECTS = [
  { name: "Markdown Notes",     desc: "A tiny offline-first notes app using IndexedDB.", tags: ["JS", "IDB"] },
  { name: "CSS Art Gallery",     desc: "Hand-crafted scenes using only HTML and CSS.",      tags: ["CSS", "Art"] },
  { name: "Regex Playground",   desc: "Test regular expressions with live highlighting.",    tags: ["JS", "Tool"] },
  { name: "Pixel Painter",       desc: "Draw on a canvas and export as PNG.",                 tags: ["Canvas"] },
  { name: "Color Palette Tool", desc: "Generate and export accessible color palettes.",     tags: ["A11y"] },
  { name: "Local Weather",       desc: "Geolocation + Open-Meteo, no API key needed.",       tags: ["API"] }
];

const projectGrid = document.getElementById("project-grid");
PROJECTS.forEach(p => {
  const el = document.createElement("article");
  el.className = "project";
  el.innerHTML = `
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
    <div>${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
  `;
  projectGrid.appendChild(el);
});

const root = document.documentElement;
const STORAGE_KEY = "preferred-theme";
function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
}
const savedTheme = localStorage.getItem(STORAGE_KEY);
if (savedTheme) applyTheme(savedTheme);

document.getElementById("theme-toggle").addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "light";
  applyTheme(current === "dark" ? "light" : "dark");
});

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();
  if (!name || !email || !message) {
    status.textContent = "Please fill in every field.";
    return;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    status.textContent = "That email looks off — double-check it.";
    return;
  }
  status.textContent = `Thanks ${name}! Your message is queued (demo only).`;
  form.reset();
});
