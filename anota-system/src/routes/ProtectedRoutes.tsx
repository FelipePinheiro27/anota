import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = localStorage.getItem("userSession");

        if (!session) {
          setIsAuth(false);
          return;
        }

        const companyData: { companyId?: string | number } =
          JSON.parse(session);
        if (!companyData.companyId) {
          setIsAuth(false);
          return;
        }

        setIsAuth(true);
      } catch (error) {
        console.error("Erro ao buscar dados da empresa:", error);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>Carregando...</div>
    );
  }

  if (isAuth === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
