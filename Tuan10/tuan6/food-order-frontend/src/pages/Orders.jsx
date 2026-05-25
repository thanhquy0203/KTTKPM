import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getOrders, updateOrderStatus } from "../api/orderApi";
import { pay } from "../api/paymentApi";

export default function Orders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const res = await getOrders(); // lấy tất cả orders
      const allOrders = res.data.orders || [];

      // Lọc orders theo user hiện tại
      const userOrders = allOrders.filter(
        (o) => Number(o.userId) === Number(user.id)
      );

      setOrders(userOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handlePayment = async (orderId, method) => {
    try {
      await pay({ orderId, userId: user.id, method });
      alert(`Order #${orderId} paid via ${method}`);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  if (!user) return <p>Please login first</p>;

  return (
    <div className="container">
      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <p>Order #{order.id}</p>
              <p>Status: {order.status}</p>
              <p>Total: {order.totalAmount}₫</p>

              {(() => {
                let items = [];
                try {
                  items = typeof order.items === 'string' ? JSON.parse(order.items) : (order.items || []);
                } catch (e) {
                  console.error("Failed to parse order items", e);
                }

                if (items && Array.isArray(items) && items.length > 0) {
                  return (
                    <>
                      <p>Items:</p>
                      <ul>
                        {items.map((item, i) => (
                          <li key={i}>
                            {item.foodName} x {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </>
                  );
                }
                return <p>(No detailed items available)</p>;
              })()}

              {order.status === "PENDING" && (
                <div style={{ marginTop: "10px" }}>
                  <button
                    className="btn"
                    onClick={() => handlePayment(order.id, "COD")}
                    style={{ marginRight: "5px" }}
                  >
                    Pay COD
                  </button>
                  <button
                    className="btn"
                    onClick={() => handlePayment(order.id, "Banking")}
                  >
                    Pay Banking
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}