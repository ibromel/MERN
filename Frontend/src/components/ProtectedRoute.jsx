import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  // tant que `useAuth` n'a pas rendu son verdict
  if (user === undefined) return <div>Chargement…</div>;

  // pas de user = on renvoie au login
  if (!user) return <Navigate to="/" replace />;

  // là où on en veut vraiment :
  return children;
}