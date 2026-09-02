const STORAGE_KEY = "mksScriptConfig";

export function getScriptConfig() {
  return {
    reviveTeamSwitchX: document.querySelector("#reviveTeamSwitchX")?.value || "0",
    reviveTeamSwitchY: document.querySelector("#reviveTeamSwitchY")?.value || "0",
    reviveTeamSwitchZ: document.querySelector("#reviveTeamSwitchZ")?.value || "0",
    minigunX: document.querySelector("#minigunX")?.value || "0",
    minigunY: document.querySelector("#minigunY")?.value || "0",
    minigunZ: document.querySelector("#minigunZ")?.value || "0",
    slimerX: document.querySelector("#slimerX")?.value || "0",
    slimerY: document.querySelector("#slimerY")?.value || "0",
    slimerZ: document.querySelector("#slimerZ")?.value || "0",
    warMachineX: document.querySelector("#warMachineX")?.value || "0",
    warMachineY: document.querySelector("#warMachineY")?.value || "0",
    warMachineZ: document.querySelector("#warMachineZ")?.value || "0",
    buildToolX: document.querySelector("#buildToolX")?.value || "0",
    buildToolY: document.querySelector("#buildToolY")?.value || "0",
    buildToolZ: document.querySelector("#buildToolZ")?.value || "0"
  };
}

export function saveScriptConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function loadScriptConfig() {
  const savedConfig = localStorage.getItem(STORAGE_KEY);

  if (!savedConfig) {
    return null;
  }

  return JSON.parse(savedConfig);
}

export function restoreScriptConfig(config) {
  if (!config) {
    return;
  }

  Object.entries(config).forEach(([id, value]) => {
    const input = document.getElementById(id);

    if (input) {
      input.value = value;
    }
  });
}

export function validateScriptConfig(config) {
  return Object.values(config).every((value) => {
    return value !== "" && Number.isFinite(Number(value));
  });
}