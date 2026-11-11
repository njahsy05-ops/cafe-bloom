import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        startsida: resolve(import.meta.dirname, "index.html"),
        meny: resolve(import.meta.dirname, "meny.html"),
        omOss: resolve(import.meta.dirname, "om-oss.html"),
        kontakt: resolve(import.meta.dirname, "kontakt.html"),
      },
    },
  },
});
