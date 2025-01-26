import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchParamSchema = z.object({
  name: z.string().optional(),
});
export const Route = createFileRoute("/hello")({
  component: RouteComponent,
  validateSearch: searchParamSchema,
});

function RouteComponent() {
  const { name } = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <div>
      Hello "/hello"! {name}{" "}
      <button onClick={() => navigate({ search: { name: "search params" } })}>
        add params
      </button>
      <button onClick={() => navigate({ search: { name: undefined } })}>
        remove Params
      </button>
    </div>
  );
}
