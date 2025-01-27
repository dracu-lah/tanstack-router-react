import NotFound from "@/components/common/NotFound";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  notFoundComponent() {
    return <NotFound />;
  },
});
