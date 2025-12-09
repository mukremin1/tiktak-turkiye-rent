import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// Vite config'i async export ederek ESM-only paketleri dynamic import ile güvenli biçimde yükleyebiliyoruz.
// Vercel'de base olarak '/' kullanılır; diğer ortamlarda (ör. GitHub Pages) mevcut base korunur.
export default defineConfig(async ({ mode }) => {
  const isVercel = !!process.env.VERCEL;
  const base = isVercel ? "/" : mode === "development" ? "/" : "/tiktak-turkiye-rent/";

  let componentTaggerPlugin: any = undefined;

  // Sadece development modunda lovable-tagger ekle (dynamic import ile ESM uyumu)
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
    base,
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