import { baseUrl } from '../basePath.ts'
import { LoginForm } from './LoginForm.tsx'
import { Main } from './Main.tsx'

export const LoginPage = () => (
	<Main class="d-flex flex-column align-items-center">
		<img
			src={`${baseUrl === '/' ? '' : baseUrl}/static/images/nRF-Cloud-powered-by-Memfault-flat.svg`}
			alt="nRF Cloud powered by Memfault"
			width={128}
			class="mb-4"
		/>
		<LoginForm />
	</Main>
)
