import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/$indexId")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { indexId } = Route.useParams();
  return (
    <div>
      <Link to={"/about"}>Hello "/$indexId" {indexId}!</Link>
      <button onClick={() => navigate({ to: "/" })}>go back</button>
    </div>
  );
}
