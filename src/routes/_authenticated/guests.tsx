import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/guests')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/guests"!</div>
}
