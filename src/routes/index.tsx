import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import Products from "../pages/Products/Products";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  </BrowserRouter>
);
