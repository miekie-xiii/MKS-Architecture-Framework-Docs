import { marked } from "marked";
import { copyButton } from "../ui/copyButton.js";
import { addLineNumbers } from "../ui/lineNumber.js";

export async function loadMarkdown(selector, path) {

  const content = document.querySelector(selector);

  if (!content) {
    console.error(`Element not found: ${selector}`);
    return;
  }

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to load: ${path}`);
    }

    const markdown = await response.text();

    content.innerHTML = marked.parse(markdown);

  } catch (error) {
    console.error(error);
  }
  addLineNumbers(content);
  copyButton(content);
}
