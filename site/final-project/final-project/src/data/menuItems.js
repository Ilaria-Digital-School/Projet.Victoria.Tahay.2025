// Navigation menu items configuration for the website
const menuItems = [
  // Home page link
  { label: "Accueil", path: "/" },

  // Reservation section with submenu items
  {
    label: "Réservation",
    path: "/Reservation",
    // submenu: [
    //   { label: "Restaurant", path: "/Reservation#arrow-restaurant" },
    //   { label: "Accès Spa", path: "/Reservation#arrow-spa" },
    //   { label: "Soins et massages", path: "/Reservation#arrow-soinsmassages" },
    // ],
  },

  // About page link
  { label: "À propos", path: "/About" },

  // Contact page link
  { label: "Contact", path: "/Contact" },

  // Login link displayed only when user is NOT logged in
  { label: "Connexion", path: "/Login", auth: false },

  // Profile link displayed only when user IS logged in
  { label: "Profil", path: "/Profile", auth: true },
];

// Export the menu items configuration for use in navigation components
export default menuItems;
