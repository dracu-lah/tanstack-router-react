import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { AuthContext } from "../hooks/useAuth";
import { Footer } from "@/components/common/layout/Footer";
import { Header } from "@/components/common/layout/Header";
import { Sidebar } from "@/components/common/layout/Sidebar";

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
    flex: 1,
    overflow: "auto", // Allow scrolling if content overflows
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
