import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Footer } from "@/components/common/layout/Footer";
import { Header } from "@/components/common/layout/Header";
import { Sidebar } from "@/components/common/layout/Sidebar";
import { AuthContextType } from "@/hooks/useAuth";
import ScrollToTop from "@/components/common/layout/ScrollToTop";

type RouterContext = {
  authentication: AuthContextType;
};

const layoutStyles = {
  container: {
    display: "flex",
    minHeight: "600vh",
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
      <ScrollToTop />
    </div>
  ),
});
