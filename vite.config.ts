import { defineConfig } from "vite";

export default defineConfig({
  base: "/circular-progress-bar",
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
      },
    },
  },
});
