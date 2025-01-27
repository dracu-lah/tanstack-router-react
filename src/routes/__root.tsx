import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { AuthContextType } from "@/hooks/useAuth";
import RootLayout from "@/components/common/layout/RootLayout";

type RouterContext = {
  authentication: AuthContextType;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ),
});
