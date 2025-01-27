import { useAuth } from "@/hooks/useAuth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { signIn } = useAuth();
  return (
    <div>
      Hello "/auth/login"!
      <br />
      <button onClick={() => signIn()}>Login Cheyada</button>
    </div>
  );
}
