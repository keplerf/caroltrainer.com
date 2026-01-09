import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { setupPlugins } from "@responsive-image/vite-plugin";

// import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: () => {
          return "assets/[name][extname]";
        },
      },
    },
  },
  plugins: [
    viteReact({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    setupPlugins({
      name: "[name]_[width].[ext]",
      include: /^[^?]+\.(jpg|jpeg|png|webp)\?.*responsive.*$/,
      w: [300, 640, 1024, 2048],
      format: ["original", "webp", "avif"],
    }),
    ViteImageOptimizer({
      png: {
        quality: 60,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
    }),
  ],
});
