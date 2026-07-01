import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        navigate("/dashboard");
    }
}, []);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("auth/register", {
        name,
        email,
        password,
      });

      console.log(response.data);

      alert("Registration successful!");

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
    finally {
  setLoading(false);
  }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <img
          src={logo}
          alt="Reon Technologies"
          className="auth-logo"
        />

        <p className="subtitle">
          Create your account to get started.
        </p>

        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;