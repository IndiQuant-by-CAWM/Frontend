/**
 * Per-route <head> tags from one helper.
 *
 * Link previews and search engines are fetched by other people's servers, so
 * every URL here is absolute. Paths carry a trailing slash because GitHub Pages
 * serves each route from `<route>/index.html` and redirects the bare path to the
 * slashed one; a canonical without the slash points at a redirect.
 *
 * Every indexable route passes its own title and description, so no page
 * inherits the home page's social card text.
 */

export const SITE_URL = "https://indiquantresearch.in";
export const SITE_NAME = "IndiQuant";

/** Bump the query when the card changes, so preview caches refetch it. */
export const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg?v=3`;
export const OG_IMAGE_ALT =
  "IndiQuant, a hedge fund in the making. Testnet phase: crowdsourced signals on Indian equities.";

/** "/" -> "https://indiquantresearch.in/", "/about" -> ".../about/". */
export function absoluteUrl(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `${SITE_URL}/${clean}/` : `${SITE_URL}/`;
}

export function pageHead({
  path,
  title,
  description,
  noindex = false,
}: {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}) {
  const url = absoluteUrl(path);
  const meta: Record<string, string>[] = [{ title }, { name: "description", content: description }];
  if (noindex) {
    meta.push({ name: "robots", content: "noindex" });
    return { meta, links: [] as Record<string, string>[] };
  }
  meta.push(
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  );
  return { meta, links: [{ rel: "canonical", href: url }] };
}
