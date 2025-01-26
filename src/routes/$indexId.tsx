import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$indexId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { indexId } = Route.useParams();
  return <div>Hello "/$indexId" {indexId}!</div>;
}
