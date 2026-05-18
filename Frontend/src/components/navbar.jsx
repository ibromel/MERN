import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function Navbar() {
  const user = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("tokenChanged"));
    navigate("/");
  };

  // Hide Navbar on login page
  if (window.location.pathname === "/") return null;

  return (
    <nav className="bg-gray-800 p-4 text-white flex flex-col items-start w-48 h-screen relative">
      {/* User state and logout in top-right */}
      {user && (
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <span className="text-green-400">●</span>
          <span className="text-sm font-medium">{user.name}</span>
          <button
            onClick={handleLogout}
            className="ml-2 px-2 py-1 bg-red-600 text-white rounded text-xs"
          >
            Déconnexion
          </button>
        </div>
      )}

      {/* Main menu */}
      <div className="mt-12 mb-8 text-xl font-bold">Menu</div>
      <NavLink to="/profile" className="mb-2 hover:underline">
        Mon Profil
      </NavLink>
      {user?.role === "admin" && (
        <>
          <NavLink to="/list" className="mb-2 hover:underline">
            Profils
          </NavLink>
          <NavLink to="/create" className="mb-2 hover:underline">
            Créer Profil
          </NavLink>
        </>
      )}
    </nav>)
}