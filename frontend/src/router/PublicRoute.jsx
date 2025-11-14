import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { Loading } from "../components/Loading";

export const PublicRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true); 

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/profile", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error verificando autenticación:", error);
      setIsAuthenticated(false);
    } finally {
      setIsChecking(false); 
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isChecking) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
