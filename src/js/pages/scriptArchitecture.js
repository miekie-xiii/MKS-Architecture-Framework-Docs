import { setupScriptTabs } from "../ui/scriptTabs.js";
import { copyButton } from "../ui/copyButton.js";
import { addLineNumbers } from "../ui/lineNumber.js";
import { getScriptConfig, saveScriptConfig, loadScriptConfig, restoreScriptConfig, validateScriptConfig } from "../forms/scriptConfig.js";
import { loadTemplate, generateScript } from "../markdown/scriptGenerator.js";
import { showToast } from "../ui/toast.js";
import { setSavedButton, resetSaveButton } from "../ui/saveButton.js";

export async function initScriptArchitecture() {
  const form = document.querySelector(".scriptForm");
  const clientScript = document.querySelector("#clientScript");
  const serverScript = document.querySelector("#serverScript");
  const button = form?.querySelector(".formButton");

  if (!form || !clientScript || !serverScript) return;

  const savedConfig = loadScriptConfig();

  if (savedConfig) restoreScriptConfig(savedConfig);

  const clientTemplate = await loadTemplate("/docs/scripts/clientSide.md");
  const serverTemplate = await loadTemplate("/docs/scripts/serverSide.md");

  const config = savedConfig || getScriptConfig();

  renderScript(clientScript, generateScript(clientTemplate, config));
  renderScript(serverScript, generateScript(serverTemplate, config));

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const config = getScriptConfig();

    if (!validateScriptConfig(config)) return;

    saveScriptConfig(config);

    renderScript(clientScript, generateScript(clientTemplate, config));
    renderScript(serverScript, generateScript(serverTemplate, config));

    setSavedButton(button);
    showToast("Saved");
  });

  form.addEventListener("input", () => {
    resetSaveButton(button);
  });

  setupScriptTabs();
}

function renderScript(container, script) {
  container.innerHTML = `<pre><code></code></pre>`;

  const block = container.querySelector("pre");
  const codeBlock = container.querySelector("code");

  block.dataset.script = script;
  codeBlock.textContent = script;

  addLineNumbers(container);
  copyButton(container);
}

