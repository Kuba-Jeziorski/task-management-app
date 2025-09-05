import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ErrorBoundary } from "react-error-boundary";

import App from "./App.tsx";
import { ErrorFallback } from "./components/ui/error-fallback.tsx";

let root = document.getElementById("root");

if (!root) {
  root = document.createElement("div");
  root.id = "root";
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
  </StrictMode>
);
