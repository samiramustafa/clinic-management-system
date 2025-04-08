import React, { useState, useEffect } from "react";

const ScrollToTopButton = ({ size = "60px", color = "#354F8E", hoverColor = "#0056b3" }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Handles scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrolls smoothly to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buttonStyle = {
    position: "fixed",
    bottom: "4rem",
    right: "2rem",
    width: size,
    height: size,
    backgroundColor: color,
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    transform: isVisible ? "scale(1)" : "scale(0)",
  };

  const hoverStyle = {
    backgroundColor: hoverColor,
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={buttonStyle}
      onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
      onMouseOut={(e) => Object.assign(e.target.style, { backgroundColor: color })}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;