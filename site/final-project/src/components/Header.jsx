import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menuItems from "../data/menuItems";
import "@/styles/header.css";



const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  // Check if the user is logged in
  useEffect(() => {
    const updateLoginStatus = () => {
      const userRole = localStorage.getItem("userRole");
      setIsLoggedIn(!!userRole);
    };

    updateLoginStatus(); 

  // Listener to detect connection/disconnect changes
  window.addEventListener("storage", updateLoginStatus);

    return () => {
      window.removeEventListener("storage", updateLoginStatus);
    };
  }, []);


  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  // Menu managed with menuItems.js
  return (
    <header className="navbar">
      <nav>
        {/* Burger menu button */}
        <div className="burger-menu" onClick={toggleMenu}>
          ☰
        </div>

        {/* Main menu */}
        <ul className={`menu ${isMenuOpen ? "menu-open" : ""}`}>
          {/* Filters menu items based on authentication status */}
          {menuItems
            .filter(item => item.auth === undefined || item.auth === isLoggedIn)
            .map((item, index) => (
              <li key={index} className={item.submenu ? "dropdown" : ""}>
                <Link to={item.path} onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>

                 {/* If the menu item has a submenu, render the dropdown */}
                {item.submenu && (
                  <ul className="menu-deroulant">
                    {item.submenu.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <Link to={sub.path} onClick={() => setIsMenuOpen(false)}>
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
