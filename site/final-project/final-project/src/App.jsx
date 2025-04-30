// Core React and Routing imports
import React from "react";
import { Outlet } from "react-router-dom";

// Global styles
import "./styles/App.css";

// Layout components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import ScrollToTop from "./components/ScrollToTop";


// Application management
function App() {
  return (
    <>
      <Header /> {/* Header at the top of all pages */}
      <ThemeToggle /> {/* Switch between dark and light mode */}
      <ScrollToTop /> {/* Scroll to top to click on the services pages */}
      <main>
        <Outlet /> {/* Pages management - mains */}
      </main>
      <Footer /> {/* Footer at the bottom of all pages */}
    </>
  );
}

export default App;
