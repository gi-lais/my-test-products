import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login/Login';
//import RegisterPage from '../pages/Register';
//import ProductsPage from '../pages/Products';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="/register" element={<RegisterPage />} />
      <Route path="/products" element={<ProductsPage />} /> */}
    </Routes>
  </BrowserRouter>
);