import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { AuthContextType } from "@/hooks/useAuth";
import RootLayout from "@/components/common/layout/RootLayout";
import NotFound from "@/components/common/NotFound";

type RouterContext = {
  authentication: AuthContextType;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ),
  notFoundComponent() {
    return <NotFound />;
  },
});
