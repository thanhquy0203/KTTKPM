import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { user, logoutUser } = useContext(UserContext);

  return (
    <div className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <h2 style={{ color: 'var(--primary)', margin: '0 20px 0 0', fontWeight: 800 }}>MixiFood</h2>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        {user?.role === "ADMIN" && <Link to="/add-food">Add Food</Link>}
        <Link to="/orders">Orders</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ marginRight: '15px', fontWeight: '600' }}>Hi, {user.username || 'User'}</span>
            <button className="btn" onClick={logoutUser} style={{ margin: 0, padding: '8px 15px' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>Register</Link>
          </>
        )}
      </div>
    </div>
  );
}