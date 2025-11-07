import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    // Basic validation
    if (!name.trim() || !email.trim() || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await API.post("/auth/signup", { name, email, password });
      localStorage.setItem("token", res.data.token); // Save JWT
      setSuccess("Signup successful! Redirecting to dashboard...");
      setError("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000); // redirect after 1s
    } catch (err) {
      setError(
        err.response?.data?.message || "Network error. Please try again later."
      );
      setSuccess("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bank Signup</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default Signup;
