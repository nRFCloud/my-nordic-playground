/** Base URL path for the app (e.g. /my-nordic-playground/ for GitHub Pages) */
export const baseUrl =
	(import.meta.env.BASE_URL ?? '/').replace(/\/$/, '') ?? '/'

/** Path for the root of the app */
export const rootPath = baseUrl === '/' ? '/' : baseUrl
