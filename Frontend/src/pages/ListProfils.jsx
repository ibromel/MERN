import React, { useEffect, useState } from "react";
import API from "../api.js";
import { useNavigate } from "react-router-dom";

export default function ListProfils() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Liste des Profils</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Nom</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b">
              <td className="p-2">{u._id}</td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => navigate(`/view/${u._id}`)}
                  className="px-2 py-1 bg-blue-600 text-white rounded"
                >
                  Voir
                </button>
                <button
                  onClick={() => navigate(`/edit/${u._id}`)}
                  className="px-2 py-1 bg-green-600 text-white rounded"
                >
                  Éditer
                </button>
                <button
                  onClick={() => navigate(`/delete/${u._id}`)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
