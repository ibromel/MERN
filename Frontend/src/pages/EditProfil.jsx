import React, { useEffect, useState } from "react";
import API from "../api.js";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProfil() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "", role: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/${id}`).then((res) => {
      setForm({ name: res.data.name, email: res.data.email, role: res.data.role, password: "" });
    });
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/${id}`, form);
      navigate("/list");
    } catch (error) {
      alert(error.response?.data.message || error.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Éditer Profil</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nom"
          onChange={handleChange}
          value={form.name}
          className="w-full border p-2"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          className="w-full border p-2"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Nouveau mot de passe"
            onChange={handleChange}
            value={form.password}
            className="w-full border p-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 text-gray-500"
          >
            {showPassword ? "Cacher" : "Voir"}
          </button>
        </div>
        <select
          name="role"
          onChange={handleChange}
          value={form.role}
          className="w-full border p-2"
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded"
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
}
