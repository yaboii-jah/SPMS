import { Navigate } from "react-router-dom";
import { useAuth } from '../contexts/auth/useAuth';
import { useEffect, useState } from "react";
import { refresh } from "../api/refresh";

const ProtectedRoute = ({ children }) => {
  const { accessToken, setAccessToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      // If no token in state, try refreshing from backend
      const result = await refresh(setAccessToken);

      if (result.success) {
        setIsValid(true); // token is valid
      } else {
        setIsValid(false); // token invalid
      }

      setLoading(false); // verification finished
    };

    verifyToken();
  }, [setAccessToken]);

  // 1️⃣ Show a loading state while verifying token
  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  // 2️⃣ Redirect to login if token is invalid
  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Otherwise render protected content
  return children;
};

export default ProtectedRoute;