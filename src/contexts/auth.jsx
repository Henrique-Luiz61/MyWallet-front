import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const lsUser = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(lsUser !== null ? lsUser.token : "");
  const [name, setName] = useState(lsUser !== null ? lsUser.userName : "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, name, setName }}>
      {children}
    </AuthContext.Provider>
  );
}
