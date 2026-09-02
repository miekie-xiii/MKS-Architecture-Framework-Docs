import { loadLayout } from "./layout/loadLayout.js";
import {initPageRouter,getCurrentPage, loadPage} from "./pages/pageRouter.js";

async function initApp() {
  await loadLayout();
  initPageRouter();
  const currentPage = getCurrentPage();
  await loadPage(currentPage, false);
}
initApp();