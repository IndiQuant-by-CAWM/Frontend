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
          // scripts/write-sitemap.mjs writes the sitemap after the build, from
          // the prerendered pages, excluding noindex routes.
          sitemap: { enabled: false },
        }
      : {}),
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
