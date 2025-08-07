// ===== Theme persistence =====
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle?.querySelector("i");

// initialize theme from localStorage
(function initTheme() {
  const saved = localStorage.getItem("theme"); // 'dark' | 'light' | null
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const start = saved || (prefersDark ? "dark" : "light");
  document.body.dataset.theme = start;
  if (themeIcon) {
    themeIcon.classList.toggle("fa-moon", start === "light");
    themeIcon.classList.toggle("fa-sun", start === "dark");
  }
})();

// toggle + persist
themeToggle?.addEventListener("click", () => {
  const darkMode = document.body.dataset.theme === "dark";
  const next = darkMode ? "light" : "dark";
  document.body.dataset.theme = next;
  localStorage.setItem("theme", next);
  if (themeIcon) {
    themeIcon.classList.toggle("fa-moon", next === "light");
    themeIcon.classList.toggle("fa-sun", next === "dark");
  }
});

// ===== Fade-in effect on load =====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".glass").forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.transition = "all 0.6s ease";
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      }, 80);
    });
  });
});

// ===== Mobile menu =====
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");


hamburger?.addEventListener("click", () => {
  const isOpen = hamburger.getAttribute("aria-expanded") === "true";
  isOpen ? closeMenu() : openMenu();
});

// close on link click
mobileMenu?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => closeMenu());
});

// close on outside click
document.addEventListener("click", (e) => {
  if (!mobileMenu || mobileMenu.hidden) return;
  const inMenu = mobileMenu.contains(e.target);
  const inHeader = hamburger && hamburger.contains(e.target);
  if (!inMenu && !inHeader) closeMenu();
});

// close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
function openMenu() {
  mobileMenu.hidden = false;
  requestAnimationFrame(() => mobileMenu.classList.add("open"));
  hamburger.setAttribute("aria-expanded", "true");
}
function closeMenu() {
  mobileMenu.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  setTimeout(() => { mobileMenu.hidden = true; }, 180);
}
