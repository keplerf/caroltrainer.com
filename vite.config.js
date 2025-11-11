import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";

// import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // css: {
  //   transformer: "lightningcss",
  // },
  // build: {
  //   cssMinify: "lightningcss",
  // },
  // plugins: [react(), tailwindcss()],
  plugins: [
    viteReact({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
});
