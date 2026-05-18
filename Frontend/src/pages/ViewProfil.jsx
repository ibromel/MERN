import React, { useEffect, useState } from "react";
import API from "../api.js";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function ViewProfil() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const current = useAuth();

  useEffect(() => {
    const url = id ? `/${id}` : "/me";
    API.get(url)
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, [id]);

  if (!user) return <div>Chargement...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Profil de {user.name}</h1>
      <ul className="list-disc pl-5 mb-4">
        <li>Email: {user.email}</li>
        <li>Role: {user.role}</li>
        <li>Créé le: {new Date(user.creatAt).toLocaleString()}</li>
      </ul>
      {(current?.role === "admin" || current?._id === user._id) && (
        <div className="space-x-2">
          <Link to={`/edit/${user._id}`} className="px-4 py-2 bg-green-600 text-white rounded">
            Éditer
          </Link>
          <Link to={`/delete/${user._id}`} className="px-4 py-2 bg-red-600 text-white rounded">
            Supprimer
          </Link>
        </div>
      )}
    </div>
  )};