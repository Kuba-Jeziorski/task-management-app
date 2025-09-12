import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "react-vendor": ["react", "react-dom"],
          "router-vendor": ["react-router", "react-router-dom"],
          "query-vendor": ["@tanstack/react-query"],
          "ui-vendor": ["@mui/material", "@emotion/react", "@emotion/styled"],
          "form-vendor": ["react-hook-form"],
          "utils-vendor": [
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
          ],
          "icons-vendor": ["lucide-react"],
          "toast-vendor": ["react-hot-toast"],
          "supabase-vendor": ["@supabase/supabase-js"],
          "error-vendor": ["react-error-boundary"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
