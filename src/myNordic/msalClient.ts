import {
	PublicClientApplication,
	type AuthenticationResult,
} from '@azure/msal-browser'
import { getMsalConfig } from './msalConfig.ts'

const GRAPH_USER_READWRITE = 'https://graph.microsoft.com/User.ReadWrite'
const DEFAULT_TEAM_PROPERTY_NAME = `extension_${MY_NORDIC_EXTENSION_ID}_defaultTeam`

let msalInstance: PublicClientApplication | null = null

export const getMsalInstance = (): PublicClientApplication => {
	if (msalInstance === null) {
		msalInstance = new PublicClientApplication(getMsalConfig())
	}
	return msalInstance
}

export const loginWithMyNordicRedirect = async (): Promise<void> => {
	const msal = getMsalInstance()
	await msal.initialize()
	await msal.loginRedirect({
		scopes: ['openid', 'profile', 'email', GRAPH_USER_READWRITE],
	})
}

/**
 * Handle the OAuth redirect on /auth/callback. Initialize MSAL, then handleRedirectPromise with
 * navigateToLoginRequestUrl: false so MSAL does not navigate away; we handle the result in the component.
 */
export const handleMyNordicRedirect = async (): Promise<{
	idToken: string
	userObjectId: string
	accessToken: string
} | null> => {
	const msal = getMsalInstance()
	await msal.initialize()
	const auth = await msal.handleRedirectPromise({
		navigateToLoginRequestUrl: false,
	})
	if (auth === null) return null
	const res = msalResultToAuthUser(auth)

	// Test for updating a user writable property.
	console.log(
		`[MyNordic] User properties before update:`,
		JSON.stringify(
			await getUserProperties(
				res.userObjectId,
				['id', 'email', 'mail', DEFAULT_TEAM_PROPERTY_NAME],
				res.accessToken,
			),
			null,
			2,
		),
	)
	await updateUserProperty(
		res.userObjectId,
		{
			[DEFAULT_TEAM_PROPERTY_NAME]: crypto.randomUUID(),
		},
		res.accessToken,
	)

	return res
}

export const updateUserProperty = async (
	userObjectId: string,
	props: Record<string, string>,
	accessToken: string,
): Promise<void> => {
	const response = await fetch(
		`https://graph.microsoft.com/v1.0/users/${userObjectId}`,
		{
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(props),
		},
	)
	if (!response.ok) {
		console.error(
			'[MyNordic] Failed to update defaultTeam:',
			response.status,
			await response.text(),
		)
	}
}

export const getUserProperties = async <T extends Record<string, unknown>>(
	userObjectId: string,
	properties: string[],
	accessToken: string,
): Promise<T | null> => {
	const select = properties.map((p) => encodeURIComponent(p)).join(',')
	const response = await fetch(
		`https://graph.microsoft.com/v1.0/users/${userObjectId}?$select=${select}`,
		{
			headers: { Authorization: `Bearer ${accessToken}` },
		},
	)
	if (!response.ok) return null
	return (await response.json()) as T
}

const msalResultToAuthUser = (
	result: AuthenticationResult,
): {
	idToken: string
	userObjectId: string
	accessToken: string
} => {
	const idToken = result.idToken ?? result.account.idToken ?? ''
	const userObjectId = result.account.localAccountId
	const accessToken = result.accessToken

	const claims = result.idTokenClaims ?? result.account.idTokenClaims

	console.log(`[IdToken]`, idToken)
	console.log(`[IdToken Claims]`, JSON.stringify(claims, null, 2))

	return { idToken, userObjectId, accessToken }
}
