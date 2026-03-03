import type { Configuration } from '@azure/msal-browser'

import { baseUrl } from '../basePath.ts'

const authority = MY_NORDIC_AUTHORITY.endsWith('/')
	? MY_NORDIC_AUTHORITY.slice(0, -1)
	: MY_NORDIC_AUTHORITY
const authorityHost = new URL(authority).hostname

const authCallbackPath =
	baseUrl === '/' ? '/auth/callback' : `${baseUrl}/auth/callback/`

export const getMsalConfig = (): Configuration => ({
	auth: {
		clientId: MY_NORDIC_CLIENT_ID,
		authority: MY_NORDIC_AUTHORITY,
		redirectUri: `${window.location.origin}${authCallbackPath}`,
		knownAuthorities: [authorityHost],
	},
	cache: {
		cacheLocation: 'sessionStorage',
	},
})
