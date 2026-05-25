import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FoodList from "./pages/FoodList";
import AddFood from "./pages/AddFood";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Orders from "./pages/Orders"

function App() {
  return (
    <UserProvider>
      <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<FoodList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-food" element={<AddFood />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/addfood" element={<AddFood />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;