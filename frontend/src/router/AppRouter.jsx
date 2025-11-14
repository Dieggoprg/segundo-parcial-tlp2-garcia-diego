import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { HomePage } from "../pages/HomePage";

export const AppRouter = ({authStatus, onLogin}) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicRoute authStatus={authStatus}/>}>
          <Route path="/login" element={<LoginPage onLoginSuccess={onLogin} />} />
          <Route path="/register" element={<RegisterPage onLoginSuccess={onLogin} />} />
        </Route>

        {/* Rutas privadas */}
        <Route element={<PrivateRoute authStatus={authStatus}  />}>
          <Route path="/home" element={<HomePage  />} />
        </Route>

        {/* Ruta catch-all - redirige a login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
