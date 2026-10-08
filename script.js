const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const printButton = document.querySelector("#print-resume");
const yearLabel = document.querySelector("#current-year");

if (yearLabel) {
  yearLabel.textContent = String(new Date().getFullYear());
}

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) closeMenu();
  });
}

printButton?.addEventListener("click", () => window.print());
