import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(async ({ mode }) => {
  let componentTaggerPlugin: any = undefined;

  if (mode === "development") {
    try {
      const mod = await import("lovable-tagger");
      const tagger =
        mod.componentTagger ??
        (mod.default && (mod.default.componentTagger ?? mod.default)) ??
        undefined;

      if (typeof tagger === "function") {
        componentTaggerPlugin = tagger();
      }
    } catch (err) {
      componentTaggerPlugin = undefined;
    }
  }

  const plugins = [
    react(),
    componentTaggerPlugin,
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "icon-512x512.png", "manifest.webmanifest"],
      manifest: {
        name: "RideYo - Araç Kiralama",
        short_name: "RideYo",
        description: "Türkiye'nin en hızlı araç kiralama platformu",
        theme_color: "#8B5CF6",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "./",
        scope: "./",
        icons: [
          {
            src: "icon-512x512.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "supabase-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
    }),
  ].filter(Boolean);

  return {
    base: mode === "development" ? "/" : "/tiktak-turkiye-rent/",
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      outDir: "dist",
      sourcemap: false,
    },
    plugins,
    optimizeDeps: {
      exclude: ["lovable-tagger"],
    },
    ssr: {
      noExternal: ["lovable-tagger"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
