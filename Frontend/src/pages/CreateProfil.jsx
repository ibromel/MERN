import React, { useState } from "react";
import API from "../api.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function CreateProfil() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "employee" });
  const [pwdLength, setPwdLength] = useState(8);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const currentUser = useAuth();

  const generatePwd = async () => {
    try {
      const res = await API.get(`/motdepasse/${pwdLength}`);
      setForm({ ...form, password: res.data.password });
    } catch {
      alert("Erreur génération du mot de passe");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/", form);
      // If admin is creating a user, stay on page and reset form
      if (currentUser?.role === "admin") {
        setForm({ name: "", email: "", password: "", role: "employee" });
        setPwdLength(8);
        setShowPassword(false);
        alert("Utilisateur créé avec succès");
      } else {
        // Non-admin registration: log in as new user
        localStorage.setItem("token", res.data.token);
        const meRes = await API.get("/me");
        if (meRes.data.role === "admin") navigate("/list");
        else navigate("/profile");
      }
    } catch (error) {
      alert(error.response?.data.message || error.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Créer un Profil</h1>
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="number"
          min={1}
          value={pwdLength}
          onChange={(e) => setPwdLength(parseInt(e.target.value, 10))}
          className="w-20 border p-2"
          placeholder="Longueur"
        />
        <button
          type="button"
          onClick={generatePwd}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Générer mot de passe
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
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
          value={form.role}
          onChange={handleChange}
          className="w-full border p-2"
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded"
        >
          Créer
        </button>
      </form>
    </div>
  );
}
