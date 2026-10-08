const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const printButton = document.querySelector("#print-resume");
const yearLabel = document.querySelector("#current-year");
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

if (yearLabel) yearLabel.textContent = String(new Date().getFullYear());

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
    if (window.innerWidth > 720) closeMenu();
  });
}

if (tabs.length) {
  const selectTab = (selectedTab, moveFocus = false) => {
    for (const tab of tabs) {
      const selected = tab === selectedTab;
      const panel = document.getElementById(tab.getAttribute("aria-controls"));
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      tab.classList.toggle("is-active", selected);
      if (panel) panel.hidden = !selected;
    }
    if (moveFocus) selectedTab.focus();
  };

  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex !== undefined) {
        event.preventDefault();
        selectTab(tabs[nextIndex], true);
      }
    });
  }
}

printButton?.addEventListener("click", () => window.print());
