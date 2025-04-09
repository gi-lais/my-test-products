import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import Products from "../pages/Products/Products";
import { PrivateRoute } from "./PrivateRoute";
import ProtectedLayout from "../layouts/Layout";
import ProductForm from "../components/ProductForm/ProductForm";
import ProductDetails from "../pages/Products/ProductsDetails";
import NotFound from "../pages/NotFound/NotFound";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />

      <Route
        element={
          <PrivateRoute>
            <ProtectedLayout />
          </PrivateRoute>
        }
      >
        <Route path="/products" element={<Products />} />
        <Route path="/products/create" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductForm isEditMode />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
