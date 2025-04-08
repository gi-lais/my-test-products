import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import Products from "../pages/Products/Products";
import { PrivateRoute } from "./PrivateRoute";
import ProtectedLayout from "../layouts/Layout";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <ProtectedLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Products />} />
      </Route>
      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  </BrowserRouter>
);
