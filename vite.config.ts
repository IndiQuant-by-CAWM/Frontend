import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  nitro: isGitHubPagesBuild ? false : undefined,
  tanstackStart: {
    ...(isGitHubPagesBuild
      ? {
          prerender: {
            enabled: true,
            crawlLinks: true,
            failOnError: true,
          },
          sitemap: {
            enabled: true,
            host: "https://indiquantresearch.in",
          },
        }
      : {}),
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
