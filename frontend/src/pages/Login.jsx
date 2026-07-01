import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "../assets/logo.png";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }
}, [navigate]);

 const handleLogin = async () => {
  try {
    setLoading(true);

    const response = await axiosInstance.post(
      "/auth/login",
      {
        email,
        password
      }
    );

    const data = response.data;

    localStorage.setItem("token", data.token);

    navigate("/dashboard");

  } catch (error) {

    console.error(error);
    alert("Invalid email or password.");

  } finally {

    setLoading(false);

  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">

        <img src={logo}
        alt="Task Manager"
        className="auth-logo"
        />
               <p className="subtitle">
          Welcome back! Sign in to continue.
        </p>

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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p
          className="forgot-password"
          onClick={() => alert("Please contact the administrator.")}
        >
          Forgot Password?
        </p>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;