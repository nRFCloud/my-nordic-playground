import type { Configuration } from '@azure/msal-browser'

const authority = MY_NORDIC_AUTHORITY.endsWith('/')
	? MY_NORDIC_AUTHORITY.slice(0, -1)
	: MY_NORDIC_AUTHORITY
const authorityHost = new URL(authority).hostname

export const getMsalConfig = (): Configuration => ({
	auth: {
		clientId: MY_NORDIC_CLIENT_ID,
		authority: MY_NORDIC_AUTHORITY,
		redirectUri: `${window.location.origin}/auth/callback`,
		knownAuthorities: [authorityHost],
	},
	cache: {
		cacheLocation: 'sessionStorage',
	},
})
