// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/cafe/", // must match your repo name since this is a project site, not a user/org site
});
