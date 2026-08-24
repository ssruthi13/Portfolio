const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const menuToggle = document.querySelector("#menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const lensButtons = document.querySelectorAll(".lens-button");
const lensPanels = document.querySelectorAll("[data-lens-panel]");
const roleItems = document.querySelectorAll("[data-role]");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

function updateThemeIcon() {
  themeIcon.textContent = root.dataset.theme === "light" ? "☀" : "☾";
}

function setLens(activeLens) {
  lensButtons.forEach((button) => {
    const isActive = button.dataset.lens === activeLens;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  lensPanels.forEach((panel) => {
    panel.classList.toggle("is-visible", panel.dataset.lensPanel === activeLens);
  });

  roleItems.forEach((item) => {
    const roles = item.dataset.role.split(" ");
    const isMatch = roles.includes(activeLens);
    item.classList.toggle("role-match", isMatch);
    item.classList.toggle("role-dim", !isMatch);
  });
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeIcon();
});

menuToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

lensButtons.forEach((button) => {
  button.addEventListener("click", () => setLens(button.dataset.lens));
});

updateThemeIcon();
setLens("backend");
