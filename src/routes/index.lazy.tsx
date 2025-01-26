import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/"!
      <Link to={"/$indexId"} params={{ indexId: "21" }}>
        12
      </Link>
    </div>
  );
}
