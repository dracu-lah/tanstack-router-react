import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    const { token } = context.authentication
    if (token) {
      throw redirect({ to: '/dashboard' })
    }
  },
})
