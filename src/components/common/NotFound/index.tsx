import React from "react";

const NotFound = () => {
  const pageStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "black",
    color: "white",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  };

  const messageStyle: React.CSSProperties = {
    fontSize: "3rem",
    fontWeight: "bold",
  };

  const subMessageStyle: React.CSSProperties = {
    fontSize: "1.5rem",
  };

  return (
    <div style={pageStyle}>
      <div>
        <div style={messageStyle}>404 - Page Not Found</div>
        <div style={subMessageStyle}>
          The page you are looking for doesn't exist.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
