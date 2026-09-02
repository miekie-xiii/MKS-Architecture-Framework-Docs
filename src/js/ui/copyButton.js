import { showToast } from "./toast.js";

export function copyButton(content) {
  if (!content) {return;}
  const codeBlocks = content.querySelectorAll("pre");
  if (!codeBlocks.length) {return;}

  codeBlocks.forEach((block) => {
    const button = document.createElement("button");

    button.className = "copyButton";
    button.textContent = "Copy";

    button.addEventListener("click", async () => {
      const code = block.dataset.script;
      
      if (!code) {return;}

      await navigator.clipboard.writeText(code);
      showToast("Copied");

      button.textContent = "Copied";
      button.classList.add("copied");

      setTimeout(() => {
        button.textContent = "Copy";
        button.classList.remove("copied");
      }, 1000);
    });

    block.appendChild(button);
  });
}