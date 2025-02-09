import { isTesting } from "@/constants/config";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@tanstack/react-router";

const headerStyles = {
  header: {
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #dee2e6",
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    color: "#212529",
  },
};
export const Header = () => {
  const router = useRouter();
  const { token, clearToken } = useAuth();
  return (
    <header style={headerStyles.header}>
      {" "}
      <h1 style={headerStyles.title}>My App</h1>
      {token && (
        <>
          {isTesting === "true" && <h1>This Is a Test Instance</h1>}
          <div>
            <p>Logged In Vro</p>
            <button
              onClick={() => {
                clearToken();
                router.invalidate();
              }}
            >
              Log out
            </button>
          </div>
        </>
      )}
    </header>
  );
};
