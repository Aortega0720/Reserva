import { defineConfig } from "vite";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";
import compress from "vite-plugin-compression";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default defineConfig(({ mode }) => ({
  root: "./",

  optimizeDeps: {
    include: ["modern-normalize"],
  },

  build: {
    outDir: "build",
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: mode === "development",
    manifest: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: mode === "production",
      },
    },
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/js/main.js"),
      },
      output: {
        entryFileNames: "js/[name].bundle.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "css/main[extname]";
          }
          const extType = assetInfo.name.split(".").pop();
          if (/png|jpe?g|gif|svg|webp/.test(extType)) {
            return `assets/images/[name][extname]`;
          }
          if (/woff2?|eot|ttf|otf/.test(extType)) {
            return `assets/fonts/[name][extname]`;
          }
          return `assets/[name][extname]`;
        },
      },
    },
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@js": resolve(__dirname, "src/js"),
      "@scss": resolve(__dirname, "src/scss"),
      "@utils": resolve(__dirname, "src/js/utils"),
      "@images": resolve(__dirname, "src/assets/images"), // Actualizado
      "@fonts": resolve(__dirname, "src/assets/fonts"), // Actualizado
    },
  },

  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: ``,
        sassOptions: {
          outputStyle: "compressed",
        },
      },
    },
    postcss: {
      plugins: [
        autoprefixer(),
        cssnano({
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        }),
      ],
    },
  },

  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/js/drupal",
          dest: "js",
        },
      ],
    }),
  ],
}));
