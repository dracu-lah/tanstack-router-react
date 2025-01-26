import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/$indexId")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { indexId } = Route.useParams();
  return (
    <div>
      Hello "/$indexId" {indexId}!{" "}
      <button onClick={() => navigate({ to: "/" })}>go back</button>
    </div>
  );
}
