import "./App.css";
import Admin from "./pages/admin/Admin";
import { Routes, Route } from "react-router-dom";
import AuthForm from "./pages/AuthForm";

import Home from "./pages/Home";
import AdminLayout from "./components/AdminLayout";
import ClientLayout from "./components/ClientLayout";
import ProductDetail from "./pages/ProductDetail";
import ProductForm from "./pages/ProductForm";
import CartPage from "./pages/Cart";
import Dashboard from "./pages/admin/Dashboard";
import User from "./pages/admin/User";
import OrderPage from "./pages/Order";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/product" element={<Admin />} />
          <Route path="/admin/user" element={<User />} />
          <Route path="/admin/add" element={<ProductForm />} />
          <Route path="/admin/update/:id" element={<ProductForm />} />
        </Route>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Route>
        <Route path="/login" element={<AuthForm isLogin />} />
        <Route path="/register" element={<AuthForm />} />
      </Routes>
    </>
  );
}

export default App;
