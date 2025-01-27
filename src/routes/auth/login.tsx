import { useAuth } from "@/hooks/useAuth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setToken } = useAuth();
  return (
    <div>
      Hello "/auth/login"!
      <br />
      <button
        onClick={() =>
          setToken({
            data: {
              roleName: "sdsafa",
              accessToken: "adfasd",
              refreshToken: "asdfasdf",
            },
          })
        }
      >
        Login Cheyada
      </button>
    </div>
  );
}
