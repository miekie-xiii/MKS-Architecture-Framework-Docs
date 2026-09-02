export function addLineNumbers(content) {
  const codeBlocks = content.querySelectorAll("pre code");

  codeBlocks.forEach((codeBlock) => {
    const lines = codeBlock.textContent.split("\n");

    codeBlock.innerHTML = "";

    lines.forEach((line, index) => {
      const codeLine = document.createElement("span");
      const lineNumber = document.createElement("span");

      codeLine.className = "codeLine";
      lineNumber.className = "lineNumber";

      lineNumber.textContent = index + 1;

      codeLine.appendChild(lineNumber);
      codeLine.append(line);
      codeBlock.appendChild(codeLine);
    });
  });
}