import { useAuth } from "@/hooks/useAuth";

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
  const { isLogged, signOut } = useAuth();
  return (
    <header style={headerStyles.header}>
      {" "}
      <h1 style={headerStyles.title}>My App</h1>
      {isLogged() && (
        <div>
          <p>Logged In Vro</p>
          <button onClick={() => signOut()}>Log out</button>
        </div>
      )}
    </header>
  );
};
