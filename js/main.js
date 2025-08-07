// ===== Theme persistence =====
var themeToggle = document.getElementById("theme-toggle");
var themeIcon = themeToggle ? themeToggle.querySelector("i") : null;
console.log("main.js loaded");
(function initTheme() {
  try {
    var saved = localStorage.getItem("theme");
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var start = saved || (prefersDark ? "dark" : "light");
    document.body.dataset.theme = start;
    if (themeIcon) {
      if (start === "light") { themeIcon.classList.add("fa-moon"); themeIcon.classList.remove("fa-sun"); }
      else { themeIcon.classList.add("fa-sun"); themeIcon.classList.remove("fa-moon"); }
    }
  } catch(e) {}
})();

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    var next = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch(e) {}
    if (themeIcon) {
      if (next === "light") { themeIcon.classList.add("fa-moon"); themeIcon.classList.remove("fa-sun"); }
      else { themeIcon.classList.add("fa-sun"); themeIcon.classList.remove("fa-moon"); }
    }
  });
}

// ===== Fade-in effect =====
document.addEventListener("DOMContentLoaded", function () {
  var glass = document.querySelectorAll(".glass");
  for (var i = 0; i < glass.length; i++) {
    var el = glass[i];
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    (function(elRef){
      requestAnimationFrame(function(){
        setTimeout(function(){
          elRef.style.transition = "all 0.6s ease";
          elRef.style.opacity = 1;
          elRef.style.transform = "translateY(0)";
        }, 80);
      });
    })(el);
  }
});

// ===== Mobile menu =====
var hamburger = document.getElementById("hamburger");
var mobileMenu = document.getElementById("mobile-menu");
var clicked = document.getElementById("clicked-indicator");
if (hamburger) {
  hamburger.addEventListener("click", function() {
    console.log("hamburger clicked");
    if (clicked) clicked.textContent = "clicked!";
  });
}

function openMenu() {
  if (!mobileMenu) return;
  mobileMenu.hidden = false;          
  if (mobileMenu.classList) mobileMenu.classList.add("open");
  if (hamburger) hamburger.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  if (!mobileMenu) return;
  if (mobileMenu.classList) mobileMenu.classList.remove("open");
  if (hamburger) hamburger.setAttribute("aria-expanded", "false");
  // wait for CSS transition, then hide to remove from flow
  setTimeout(function(){ mobileMenu.hidden = true; }, 180);
}

if (hamburger) {
  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    var isOpen = hamburger.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu(); else openMenu();
  });
}

if (mobileMenu) {
  var links = mobileMenu.querySelectorAll("a");
  for (var j = 0; j < links.length; j++) {
    links[j].addEventListener("click", closeMenu);
  }
}

document.addEventListener("click", function (e) {
  if (!mobileMenu || mobileMenu.hidden) return;
  if (mobileMenu.contains(e.target)) return;           // click inside menu
  if (hamburger && hamburger.contains(e.target)) return; // click on button
  closeMenu();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeMenu();
});
