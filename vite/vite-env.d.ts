// These constants are string-replaced compile time.

// See https://vitejs.dev/config/shared-options.html#define
declare const VERSION: string
declare const BUILD_TIME: string
/** My Nordic OAuth2 IdP authority (e.g. https://nscexternaltest.ciamlogin.com/) */
declare const MY_NORDIC_AUTHORITY: string
/** My Nordic OAuth2 client ID */
declare const MY_NORDIC_CLIENT_ID: string
declare const MY_NORDIC_EXTENSION_ID: string

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMeta {
	readonly env: ImportMetaEnv
}
