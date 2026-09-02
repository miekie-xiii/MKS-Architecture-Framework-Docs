import { initScriptArchitecture } from "./scriptArchitecture.js";

export async function loadPage(path, updateHistory = true) {
  const pageContent = document.querySelector("#pageContent");
  
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to load page: ${path}`);
    }

    const html = await response.text();

    pageContent.innerHTML = html;

    if (updateHistory) {
      window.history.pushState({}, "", `#${path}`);
    }

    updateActiveLink(path);

    await initPage(path);

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  } catch (error) {
    console.error(error);

    pageContent.innerHTML = `
      <h1 class="header1">Page Not Found</h1>
      <div class="sectionLine"></div>
      <p class="parag">
        The requested documentation page could not be loaded.
      </p>
    `;
  }
}

async function initPage(path) {
  if (path === "/pages/clientServerScript.html") {
    await initScriptArchitecture();
  }
}

export function updateActiveLink(path) {
  const navLinks = document.querySelectorAll(".sidebar a");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");

    link.classList.toggle("active", linkPath === path);
  });
}

export function initPageRouter() {
  const navLinks = document.querySelectorAll(".sidebar a");

  navLinks.forEach((link) => {
    link.addEventListener("click", async (event) => {
      event.preventDefault();

      const path = link.getAttribute("href");

      await loadPage(path);
    });
  });

  window.addEventListener("popstate", async () => {
    const path = getCurrentPage();

    await loadPage(path, false);
  });
}

export function getCurrentPage() {
  const hash = window.location.hash;

  if (!hash) {
    return "/pages/introduction.html";
  }

  return hash.substring(1);
}