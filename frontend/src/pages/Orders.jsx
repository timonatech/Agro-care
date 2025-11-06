import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { fetchOrders } from "../api/api";
import OrderCard from "../components/OrderCard";

export default function Orders() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchOrders(user.id).then((res) => setOrders(res.data)).catch(console.error);
    }
  }, [user]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? <p>No orders found.</p> : orders.map((o) => <OrderCard key={o._id} order={o} />)}
    </div>
  );
}
