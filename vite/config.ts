import { preact } from '@preact/preset-vite'
import { defineConfig, type PluginOption } from 'vite'
import { replaceInIndex } from './replaceInIndex.ts'
import { homepage, version } from './siteInfo.ts'

export const createConfig = ({
	myNordicAuthority,
	myNordicClientId,
	myNordicExtensionId,
	plugins,
	port = 8080,
}: {
	myNordicAuthority: string
	myNordicClientId: string
	myNordicExtensionId: string
	plugins?: PluginOption[]
	port?: number
}): ReturnType<typeof defineConfig> => {
	const define: Record<string, string> = {
		HOMEPAGE: JSON.stringify(homepage),
		VERSION: JSON.stringify(version),
		BUILD_TIME: JSON.stringify(new Date().toISOString()),
		MY_NORDIC_AUTHORITY: JSON.stringify(myNordicAuthority),
		MY_NORDIC_CLIENT_ID: JSON.stringify(myNordicClientId),
		MY_NORDIC_EXTENSION_ID: JSON.stringify(myNordicExtensionId),
	}
	for (const [k, v] of Object.entries(define)) {
		console.debug(`[vite define] ${k}:`, v)
	}

	return defineConfig({
		plugins: [
			preact({
				babel: {
					plugins: ['@babel/plugin-syntax-import-assertions'],
				},
			}),
			replaceInIndex({
				version,
			}),
			...(plugins ?? []),
		],
		preview: {
			host: 'localhost',
			port,
		},
		server: {
			host: 'localhost',
			port,
		},
		resolve: {
			alias: [
				{ find: '#components/', replacement: '/src/components/' },
				{ find: '#context/', replacement: '/src/context/' },
				{ find: '#myNordic/', replacement: '/src/myNordic/' },
				{ find: '#utils/', replacement: '/src/utils/' },
			],
		},
		build: {
			outDir: './build',
			sourcemap: true,
		},
		esbuild: {
			logOverride: { 'this-is-undefined-in-esm': 'silent' },
		},
		// string values will be used as raw expressions, so if defining a string constant, it needs to be explicitly quoted
		define: {
			...define,
			global: 'window',
		},
	})
}
