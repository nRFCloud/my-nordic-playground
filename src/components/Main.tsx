import type { ComponentChildren } from 'preact'

export const Main = ({
	children,
	class: className,
}: {
	children: ComponentChildren
	class: string
}) => <main class={className}>{children}</main>
