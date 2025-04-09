import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import Products from "../pages/Products/Products";
import { PrivateRoute } from "./PrivateRoute";
import ProtectedLayout from "../layouts/Layout";
import ProductForm from "../components/ProductForm/ProductForm";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <Products />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/products/create"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <ProductForm />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/products/edit/:id"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <ProductForm isEditMode />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  </BrowserRouter>
);
