const footerStyles = {
  footer: {
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #dee2e6",
    textAlign: "center" as const,
    position: "fixed" as const,
    bottom: 0,
    width: "100%",
  },
};

export const Footer = () => (
  <footer style={footerStyles.footer}>
    <p>© 2025 My App. All rights reserved.</p>
  </footer>
);
