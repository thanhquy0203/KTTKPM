import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/userApi";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    await register(form); // gọi API register
    alert("Register success!");
    navigate("/login"); // chuyển sang login
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <input
        placeholder="Username"
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}