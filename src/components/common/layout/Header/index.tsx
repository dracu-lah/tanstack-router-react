const headerStyles = {
  header: {
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #dee2e6",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    color: "#212529",
  },
};

export const Header = () => (
  <header style={headerStyles.header}>
    <h1 style={headerStyles.title}>My App</h1>
  </header>
);
