export async function loadComponent(selector, path) {
  const element = document.querySelector(selector);

  if (!element) {
    console.error(`Element not found: ${selector}`);
    return;
  }

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to load: ${path}`);
    }

    element.innerHTML = await response.text();

  } catch (error) {
    console.error(error);
  }
}

