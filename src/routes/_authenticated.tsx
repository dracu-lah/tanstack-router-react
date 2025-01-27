import NotFound from "@/components/common/NotFound";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { token } = context.authentication;
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },

  notFoundComponent() {
    return <NotFound />;
  },
});
