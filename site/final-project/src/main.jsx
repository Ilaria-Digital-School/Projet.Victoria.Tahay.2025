// React core imports
import React from "react";
import ReactDOM from "react-dom/client";

// Main App component and global styles
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import "./styles/index.css";

// React Router for navigation
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Page components for routing
import Home from "./pages/Home.jsx";
import Reservation from "./pages/Reservation.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Restaurant from "./pages/services/Restaurant.jsx";
import Spa from "./pages/services/Spa.jsx";
import Care from "./pages/services/Care.jsx";
import Gym from "./pages/services/Gym.jsx";
import Bar from "./pages/services/Bar.jsx";
import Library from "./pages/services/Library.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Profile from './pages/Profile';
import MyReservations from './pages/MyReservations';
import EditReservation from './pages/EditReservation';
import ProviderReservations from "./pages/ProviderReservations.jsx"; 
import AdminReservations from "./pages/AdminReservations.jsx";


// Auto-generated routes (from Vite plugin)
import routes from "~react-pages";


// Create a router that uses App.jsx as the main layout
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { path: "/", element: <Home /> }, 
      { path: "/Reservation", element: <Reservation /> },
      { path: "/About", element: <About /> },
      { path: "/Contact", element: <Contact /> },
      { path: "/Login", element: <Login /> },
      { path: "/services/Restaurant", element: <Restaurant /> },
      { path: "/services/Spa", element: <Spa /> },
      { path: "/services/Care", element: <Care /> },
      { path: "/services/Gym", element: <Gym /> },
      { path: "/services/Bar", element: <Bar /> },
      { path: "/services/Library", element: <Library /> },
      { path: "/Signup", element: <Signup /> },
      { path: "/ForgotPassword", element: <ForgotPassword /> },
      { path: "/ResetPassword", element: <ResetPassword /> },
      { path: "/Profile", element: <Profile /> },
      { path: "/MyReservations", element: <MyReservations /> },
      { path: "/EditReservation/:id", element: <EditReservation /> }, 
      { path: "/ProviderReservations", element: <ProviderReservations /> }, 
      { path: "/AdminReservations", element: <AdminReservations /> }
    ]
  },
]);

// Render the React application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
