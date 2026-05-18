import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./hooks/useAuth.js";

import LoginPage from "./pages/LoginPage.jsx";
import CreateProfil from "./pages/CreateProfil.jsx";
import ListProfils from "./pages/ListProfils.jsx";
import EditProfil from "./pages/EditProfil.jsx";
import ViewProfil from "./pages/ViewProfil.jsx";
import DeleteProfil from "./pages/DeleteProfil.jsx";

export default function App() {
  const user = useAuth();

  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Navbar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* Création de profil sans authentification */}
            <Route path="/create" element={<CreateProfil />} />
            {/* Profil personnel protégé */}
            <Route path="/profile" element={<ProtectedRoute user={user}><ViewProfil /></ProtectedRoute>} />
            {/* Liste / édition / suppression réservées aux admins */}
            <Route
              path="/list"
              element={
                <ProtectedRoute user={user}>
                  {user?.role === "admin" ? <ListProfils /> : <Navigate to="/profile" replace />}
                </ProtectedRoute>
              }
            />
            <Route
   path="/view/:id"
   element={
     <ProtectedRoute user={user}>
       <ViewProfil />
     </ProtectedRoute>
   }
 />
            <Route path="/edit/:id" element={<ProtectedRoute user={user}><EditProfil /></ProtectedRoute>} />
            <Route path="/delete/:id" element={<ProtectedRoute user={user}><DeleteProfil /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}