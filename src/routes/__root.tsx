import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { AuthContext } from "../hooks/useAuth";
import { Footer } from "@/components/common/layout/footer";
import { Header } from "@/components/common/layout/header";
import { Sidebar } from "@/components/common/layout/sidebar";

type RouterContext = {
  authentication: AuthContext;
};

const layoutStyles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column" as const,
  },
  mainContainer: {
    display: "flex",
    flex: 1,
  },
  main: {
    marginLeft: "200px", // Match sidebar width
    padding: "1rem",
    flex: 1,
    marginBottom: "60px", // Account for footer height
  },
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div style={layoutStyles.container}>
      <Header />
      <div style={layoutStyles.mainContainer}>
        <Sidebar />
        <main style={layoutStyles.main}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  ),
});
