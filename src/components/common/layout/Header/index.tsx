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
      )}
    </header>
  );
};
