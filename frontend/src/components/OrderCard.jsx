export default function OrderCard({ order }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "10px" }}>
      <h4>Order ID: {order._id}</h4>
      <p>Status: {order.status}</p>
      <p>Total: ${order.total}</p>
    </div>
  );
}
