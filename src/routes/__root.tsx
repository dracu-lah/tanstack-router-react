import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { AuthContext } from "../hooks/useAuth";
const activeProps = {
  style: {
    fontWeight: "bold",
  },
};

type RouterContext = {
  authentication: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <h1>My App</h1>
      <ul>
        <li>
          <Link to="/auth/login" activeProps={activeProps}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/dashboard" activeProps={activeProps}>
            Dashboard
          </Link>
        </li>
      </ul>
      <Outlet />
    </>
  ),
});
