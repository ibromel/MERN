import React, { useState } from "react";
import API from "../api.js";
import { useNavigate, NavLink } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("tokenChanged"));
      const meRes = await API.get("/me");
      const role = meRes.data.role;
      if (role === "admin") navigate("/list");
      else navigate("/profile");
    } catch {
      alert("Identifiants invalides");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-teal-600">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Employee Management System</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2"
              placeholder="Enter Email"
            />
          </div>
          <div>
            <label className="block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2"
              placeholder="Enter Password"
            />
          </div>
          <button
            type="submit"
            className="bg-teal-600 text-white w-full p-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          <NavLink to="/create" className="text-teal-600 hover:underline">
            Créer un compte
          </NavLink>
        </p>
      </div>
    </div>
  );
}
