import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";
import { useEffect, useState } from "react";
import { refresh } from "../api/refresh";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { setAccessToken, userRole, setUserRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const result = await refresh(setAccessToken, setUserRole);

      if (result.success) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }

      setLoading(false);
    };

    verifyToken();
  }, [setAccessToken, setUserRole]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    if (["IPCR", "OPCR", "DPCR"].includes(userRole)) {
      return <Navigate to="/homepage" replace />;
    }

    return <Navigate to="/list" replace />;
  }

  return children;
};

export default ProtectedRoute;