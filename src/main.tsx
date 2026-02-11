import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { registerSW } from "virtual:pwa-register";

import App from "./App.tsx";
import { ErrorFallback } from "./components/ui/error-fallback.tsx";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
});

let root = document.getElementById("root");

if (!root) {
  root = document.createElement("div");
  root.id = "root";
  root.classList.add("w-full", "h-full", "bg-tma-light-300");
  document.body.appendChild(root);
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
