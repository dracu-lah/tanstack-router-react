import { Link } from "@tanstack/react-router";

const sidebarStyles = {
  sidebar: {
    width: "200px",
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    borderRight: "1px solid #dee2e6",
    left: 0,
  },
  nav: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  navItem: {
    marginBottom: "0.5rem",
  },
  link: {
    textDecoration: "none",
    color: "#212529",
  },
  activeLink: {
    fontWeight: "bold",
  },
};

export const Sidebar = () => (
  <div style={sidebarStyles.sidebar}>
    <nav>
      <ul style={sidebarStyles.nav}>
        <li style={sidebarStyles.navItem}>
          <Link
            to="/auth/login"
            style={sidebarStyles.link}
            activeProps={{ style: sidebarStyles.activeLink }}
          >
            Login
          </Link>
        </li>
        <li style={sidebarStyles.navItem}>
          <Link
            to="/dashboard"
            style={sidebarStyles.link}
            activeProps={{ style: sidebarStyles.activeLink }}
          >
            Dashboard
          </Link>
        </li>

        <li style={sidebarStyles.navItem}>
          <Link
            to="/about"
            style={sidebarStyles.link}
            activeProps={{ style: sidebarStyles.activeLink }}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);
