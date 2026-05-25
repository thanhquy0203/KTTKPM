import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Khởi tạo giỏ hàng từ localStorage nếu có sẵn
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Tự động đồng bộ giỏ hàng vào localStorage mỗi khi có sự thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (food) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === food.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === food.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...food, quantity: 1 }];
    });
  };

  const removeFromCart = (foodId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== foodId));
  };

  const updateQuantity = (foodId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === foodId) {
          const newQuantity = (item.quantity || 1) + delta;
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}