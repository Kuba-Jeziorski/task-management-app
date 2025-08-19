import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import App from "./App.tsx";

let root = document.getElementById("root");

if (!root) {
  root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
