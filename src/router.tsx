import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // GitHub Pages serves every route from <route>/index.html and redirects the
    // bare path to the slashed one, so the slashed URL is the canonical one.
    trailingSlash: "always",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
