import React from "react";
import API from "../api.js";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function DeleteProfil() {
  const { id } = useParams();
  const navigate = useNavigate();
  const current = useAuth();

  const handleDelete = async () => {
    try {
      await API.delete(`/${id}`);
      // Si l'utilisateur supprime son propre profil, on le déconnecte
      if (current?._id === id) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        navigate("/list");
      }
    } catch (error) {
      console.error("Erreur suppression:", error);
      alert(error.response?.data.message || error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Supprimer Profil</h1>
      <p>Êtes-vous sûr ?</p>
      <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">
        Confirmer
      </button>
    </div>
  );
}