import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    build: {
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,
      sourcemap: true,
    },
    server: {
      port: parseInt(process.env.PORT || "3000"),
      open: true,
      proxy: {
        "/graphql": {
          target: process.env.VITE_API_URL || "http://localhost:3001",
          secure: false,
          changeOrigin: true,
        },
      },
    },
  });
};