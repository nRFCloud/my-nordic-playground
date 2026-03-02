import { loginWithMyNordicRedirect } from '#myNordic/msalClient.ts'
import { useState } from 'preact/hooks'

export const LoginForm = () => {
	const [myNordicLoading, setMyNordicLoading] = useState(false)

	return (
		<article>
			<h1 class="display-6 mb-4">Log in</h1>

			<button
				type="button"
				class="mt-2 btn btn-outline-primary w-100"
				disabled={myNordicLoading}
				onClick={() => {
					setMyNordicLoading(true)
					loginWithMyNordicRedirect()
						.finally(() => setMyNordicLoading(false))
						.catch((err) => {
							console.error(`[Auth]`, `Login failed`, err)
						})
				}}
				tabIndex={4}
			>
				{myNordicLoading
					? 'Redirecting to My Nordic …'
					: 'Log in with My Nordic'}
			</button>
		</article>
	)
}
