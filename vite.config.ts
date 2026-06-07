import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// Deployed as a GitHub Pages *project* site at /portfolio/, so the production
// build needs that base path. Dev server stays at the root.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/portfolio/" : "/",
  plugins: [react(), tailwindcss()],
}));
