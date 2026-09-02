export function showToast(message) {
  const toast = document.querySelector(".toast");

  if (!toast) return;

  toast.classList.remove("active");
  toast.textContent = "";

  requestAnimationFrame(() => {
    toast.textContent = message;
    toast.classList.add("active");

    setTimeout(() => {
      toast.classList.remove("active");
    }, 1000);
  });
}