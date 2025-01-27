import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const buttonStyle = {
    position: "fixed" as const,
    bottom: "20px",
    right: "20px",
    zIndex: 50,
    borderRadius: "50%",
    backgroundColor: "#007bff", // basic blue color
    padding: "10px",
    color: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    border: "none",
    cursor: "pointer",
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={buttonStyle}
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
