import React from "react";
import { Footer } from "@/components/common/layout/Footer";
import { Header } from "@/components/common/layout/Header";
import { Sidebar } from "@/components/common/layout/Sidebar";
import ScrollToTop from "@/components/common/layout/ScrollToTop";

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
type RootLayoutProps = {
  children: React.ReactNode; // Type for children
};
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
  <div style={layoutStyles.container}>
    <Header />
    <div style={layoutStyles.mainContainer}>
      <Sidebar />
      <main style={layoutStyles.main}>{children}</main>
    </div>
    <Footer />
    <ScrollToTop />
  </div>
);

export default RootLayout;
