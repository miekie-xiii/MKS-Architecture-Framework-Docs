export function setSavedButton(button) {
  if (!button) return;

  button.textContent = "Saved";
  button.classList.add("saved");

  setTimeout(() => {
    button.textContent = "Save";
    button.classList.remove("saved");
  }, 1000);
}

export function resetSaveButton(button) {
  if (!button) return;

  button.textContent = "Save";
  button.classList.remove("saved");
}