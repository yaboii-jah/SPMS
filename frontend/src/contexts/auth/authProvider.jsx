import { useState } from "react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [userRole, setUserRole]  = useState(null)
   
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
}