import { showToast } from "./toast.js";

export function copyButton(content) {
  if (!content) {return;}
  const codeBlocks = content.querySelectorAll("pre");
  if (!codeBlocks) {return;}

  codeBlocks.forEach((block) => {
    const button = document.createElement("button");

    button.className = "copyButton";
    button.textContent = "Copy";

    button.addEventListener("click", async () => {
      const codeLines = block.querySelectorAll(".codeLine");
      const code = [...codeLines]
        .map((line) => line.childNodes[1]?.textContent || "")
        .join("\n");

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