import { handleMyNordicRedirect } from '#myNordic/msalClient.ts'
import { useEffect, useState } from 'preact/hooks'
import { rootPath } from '../basePath.ts'
import { Main } from './Main.tsx'

type State =
	| { status: 'pending' }
	| { status: 'done' }
	| { status: 'error'; message: string }

export const AuthCallback = () => {
	const [state, setState] = useState<State>({ status: 'pending' })

	useEffect(() => {
		handleMyNordicRedirect()
			.then((result) => {
				if (result === null) {
					window.location.pathname = rootPath
					return
				}
				setState({ status: 'done' })
				window.location.pathname = rootPath
			})
			.catch((err) => {
				setState({
					status: 'error',
					message: (err as Error).message ?? 'Login failed',
				})
			})
	}, [])

	if (state.status === 'error') {
		return (
			<Main class="d-flex flex-column align-items-center">
				<article>
					<h1 class="display-6 mb-4">Sign-in error</h1>
					<div class="alert alert-danger" role="alert">
						{state.message}
					</div>
					<a href={rootPath} class="btn btn-primary">
						Back to login
					</a>
				</article>
			</Main>
		)
	}

	return (
		<Main class="d-flex flex-column align-items-center">
			<article>
				<h1 class="display-6 mb-4">Completing sign-in …</h1>
				<div
					class="progress"
					role="progressbar"
					aria-label="Completing sign-in"
					aria-valuenow={50}
					aria-valuemin={0}
					aria-valuemax={100}
				>
					<div
						class="progress-bar progress-bar-striped progress-bar-animated"
						style="width: 50%"
					></div>
				</div>
			</article>
		</Main>
	)
}
