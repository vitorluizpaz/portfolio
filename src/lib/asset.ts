/**
 * Resolve a path under /public against the app's base URL.
 * In dev the base is "/"; on GitHub Pages it's "/portfolio/", so a stored
 * path like "/shots/x.png" must be rebased to "/portfolio/shots/x.png".
 */
export const asset = (path: string) =>
  import.meta.env.BASE_URL + path.replace(/^\//, "");
