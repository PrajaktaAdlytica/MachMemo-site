import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  root: "vercel",
  plugins: [react()],
  publicDir: "../public",
  resolve: {
    alias: {
      "next/link": fileURLToPath(
        new URL("./vercel/src/NextLinkShim.tsx", import.meta.url),
      ),
    },
  },
  build: {
    outDir: "../vercel-dist",
    emptyOutDir: true,
  },
});
