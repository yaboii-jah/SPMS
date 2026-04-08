import { useState } from "react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}