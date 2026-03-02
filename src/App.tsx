import { AuthCallback } from '#components/AuthCallback.tsx'
import { LoginPage } from '#components/LoginPage.tsx'
import { LocationProvider, Route, Router } from 'preact-iso'
import { baseUrl, rootPath } from './basePath.ts'

const callbackPath =
	baseUrl === '/' ? '/auth/callback' : `${baseUrl}/auth/callback`

export const App = () => (
	<LocationProvider scope={baseUrl === '/' ? undefined : baseUrl}>
		<Router>
			<Route path={callbackPath} component={AuthCallback} />
			<Route path={rootPath} component={LoginPage} />
		</Router>
	</LocationProvider>
)
