import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from '../pages/Auth/Auth';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
    </Routes>
  </BrowserRouter>
);