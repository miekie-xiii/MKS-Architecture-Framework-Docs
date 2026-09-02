export function initSidebarNav() {
  const activePage = window.location.pathname;
  const navLinks = document.querySelectorAll(".sidebar a");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === activePage) {
      link.classList.add("active");
    }
  });
}