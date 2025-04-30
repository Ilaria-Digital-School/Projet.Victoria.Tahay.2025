import React, { useEffect, useState } from "react";

// ThemeToggle component: Allows users to toggle between light and dark themes
const ThemeToggle = () => {
  // Initialize the theme state (defaulting to localStorage value or "light")
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Update the theme on the HTML root element and save to localStorage when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle between "light" and "dark" themes
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Render a button that lets the user switch themes with appropriate icon and tooltip
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme} 
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
