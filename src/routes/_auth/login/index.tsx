import { useAuth } from "@/hooks/useAuth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setToken } = useAuth();
  const navigate = Route.useNavigate();
  return (
    <div>
      Hello "/auth/login"!
      <br />
      <button
        onClick={() => {
          const loginData = {
            accessToken: "your-access-token",
            refreshToken: "your-refresh-token",
            data: {
              roleName: "admin",
              userId: "123",
              permissions: ["read", "write"],
            },
          };
          setToken({
            data: loginData,
          });
          navigate({ to: "/dashboard" });
        }}
      >
        Login Cheyada
      </button>
    </div>
  );
}
