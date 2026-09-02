import { loadComponent } from "./loadComponent.js";


export async function loadLayout() {
  await loadComponent("#header", "/components/header.html");
  await loadComponent("#sidebar", "/components/sidebar.html");
}