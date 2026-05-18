import { useState, useEffect, useCallback } from "react";
import API from "../api.js";

// Hook to fetch current user based on token; updates on token changes
export function useAuth() {
  const [user, setUser] = useState(undefined);

  const fetchUser = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    API.get("/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  useEffect(() => {
    fetchUser();
    window.addEventListener("tokenChanged", fetchUser);
    return () => window.removeEventListener("tokenChanged", fetchUser);
  }, [fetchUser]);

  return user;
}