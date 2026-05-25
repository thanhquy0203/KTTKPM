import { pay } from "../api/paymentApi";

export default function Checkout() {
  const handlePay = async () => {
    await pay({
      orderId: 1,
      method: "COD"
    });

    alert("Payment success!");
  };

  return (
    <div>
      <h2>Payment</h2>
      <button onClick={handlePay}>Pay COD</button>
    </div>
  );
}