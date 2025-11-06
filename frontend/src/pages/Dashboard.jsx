import { useUser } from "@clerk/clerk-react";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2>Welcome, {user?.fullName || "Farmer"}!</h2>
      <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
      <p>Role: Buyer / Farmer (set manually later)</p>
    </div>
  );
}
