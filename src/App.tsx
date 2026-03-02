import { AuthCallback } from '#components/AuthCallback.tsx'
import { LoginPage } from '#components/LoginPage.tsx'
import { LocationProvider, Route, Router } from 'preact-iso'

export const App = () => (
	<LocationProvider>
		<Router>
			<Route path="/auth/callback" component={AuthCallback} />
			<Route path="/" component={LoginPage} />
		</Router>
	</LocationProvider>
)
