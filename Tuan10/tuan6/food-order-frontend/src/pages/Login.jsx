import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userApi";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

 const handleLogin = async () => {
  try {
    const res = await login(form); // gọi API
    loginUser(res.data); // lưu cả role
    navigate("/"); // chuyển Home
    console.log(res.id);
    
  } catch (err) {
    alert("Login failed!");
    console.error(err);
  }
};

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}