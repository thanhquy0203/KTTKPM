// src/pages/Cart.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../api/orderApi";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, clearCart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      const orderData = {
        userId: user.id,
        items: cart.map(item => ({ foodId: item.id, quantity: item.quantity || 1 }))
      };

      console.log("Creating order with:", orderData);

      await createOrder(orderData);

      clearCart();
      alert("Order created successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to create order: " + (err.response?.data?.error || err.message));
    }
  };

  const grandTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="container">
      <h2 className="text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center" style={{ marginTop: '50px' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>Your cart is empty</p>
          <button className="btn" style={{ width: '200px' }} onClick={() => navigate("/")}>
            Go Shopping
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--text-dark)' }}>{item.name}</div>
                <div style={{ color: 'var(--primary)', fontWeight: '700' }}>{item.price}₫</div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '5px' }}>
                  <button 
                    className="btn" 
                    style={{ width: '30px', height: '30px', padding: 0, margin: 0, backgroundColor: '#ddd', color: '#333', boxShadow: 'none' }}
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: 'bold' }}>{item.quantity || 1}</span>
                  <button 
                    className="btn" 
                    style={{ width: '30px', height: '30px', padding: 0, margin: 0, backgroundColor: '#ddd', color: '#333', boxShadow: 'none' }}
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  className="btn" 
                  style={{ backgroundColor: '#e74c3c', padding: '8px 12px', margin: 0, fontSize: '0.9rem' }}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '30px', textAlign: 'right', borderTop: '2px solid #eee', paddingTop: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginRight: '10px' }}>Total Amount:</span>
              <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>
                {grandTotal.toLocaleString()}₫
              </span>
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button 
                className="btn" 
                style={{ width: '180px', backgroundColor: '#7f8c8d', background: '#7f8c8d', boxShadow: 'none' }} 
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button className="btn" style={{ width: '250px' }} onClick={handleOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}