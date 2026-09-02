export function setupScriptTabs() {
  const tabs = document.querySelectorAll(".scriptTab");
  const panels = document.querySelectorAll(".scriptPanel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.target;

      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });

      panels.forEach((panel) => {
        panel.classList.remove("active");
      });

      tab.classList.add("active");

      document
        .getElementById(target)
        .classList.add("active");
    });
  });
}