import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../assets/logo.png";

function Sidebar({ open }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        // 🧹 remove token
        localStorage.removeItem("token");

        // 🚪 redirect to login page
        navigate("/");
    };

    return (
        <div className={`sidebar ${open ? "active" : ""}`}>

            {/* Logo */}
            <div className="sidebar-logo">
                <img src={logo} alt="logo" />
            </div>

            {/* Navigation */}
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/tasks">Tasks</Link>
                <Link to="/profile">Profile</Link>
            </nav>

            {/* Logout Button */}
            <button className="logout" onClick={handleLogout}>
                Logout
            </button>

        </div>
    );
}

export default Sidebar;