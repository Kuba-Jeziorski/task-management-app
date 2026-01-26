import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "TMA",
        short_name: "TMA_2",
        description: "TMA_3",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
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
