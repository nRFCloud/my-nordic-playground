import { createConfig } from './vite/config.ts'

export default createConfig({
	port:
		process.env.DEV_SERVER_PORT !== undefined
			? Number(process.env.DEV_SERVER_PORT)
			: undefined,
	myNordicAuthority:
		process.env.MY_NORDIC_AUTHORITY ?? 'https://nscexternaltest.ciamlogin.com/',
	myNordicClientId:
		process.env.MY_NORDIC_CLIENT_ID ?? '30bf32d3-9446-476b-8060-e3099e456508',
	myNordicExtensionId:
		process.env.MY_NORDIC_EXTENSION_ID ?? 'bf5bb55b1af040c0ae2b960da542a1eb',
})
