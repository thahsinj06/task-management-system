import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axiosInstance.get("/auth/profile");
                setUser(res.data);
            } catch (err) {
                console.log("Profile fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div style={styles.center}>
                <div style={styles.loader}></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div style={styles.center}>
                <p style={{ color: "#888" }}>No user found</p>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>

                {/* Avatar */}
                <div style={styles.avatar}>
                    {user.name?.charAt(0).toUpperCase()}
                </div>

                {/* Name */}
                <h2 style={styles.name}>{user.name}</h2>

                {/* Email */}
                <p style={styles.email}>{user.email}</p>

                {/* Divider */}
                <div style={styles.divider}></div>

                {/* Info Section */}
                <div style={styles.infoBox}>

                    <div style={styles.infoRow}>
                        <span style={styles.label}>Account Status</span>
                        <span style={styles.active}>Active</span>
                    </div>

                    <div style={styles.infoRow}>
                        <span style={styles.label}>Member Since</span>
                        <span style={styles.value}>
                            {new Date().toLocaleDateString()}
                        </span>
                    </div>

                </div>

                {/* Button */}
                <button style={styles.button}>
                    Edit Profile (coming soon)
                </button>

            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
    },
    card: {
        width: "360px",
        background: "#fff",
        borderRadius: "16px",
        padding: "25px",
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    },
    avatar: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: "#4f46e5",
        color: "#fff",
        fontSize: "28px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto 15px",
        fontWeight: "bold",
    },
    name: {
        margin: "10px 0 5px",
        fontSize: "20px",
    },
    email: {
        color: "#666",
        fontSize: "14px",
    },
    divider: {
        height: "1px",
        background: "#eee",
        margin: "20px 0",
    },
    infoBox: {
        textAlign: "left",
        fontSize: "13px",
    },
    infoRow: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
    },
    label: {
        color: "#888",
    },
    value: {
        color: "#333",
        fontWeight: "500",
    },
    active: {
        color: "#16a34a",
        fontWeight: "600",
    },
    button: {
        marginTop: "20px",
        width: "100%",
        padding: "10px",
        borderRadius: "10px",
        border: "none",
        background: "#4f46e5",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "500",
    },
    center: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    loader: {
        width: "35px",
        height: "35px",
        border: "4px solid #ddd",
        borderTop: "4px solid #4f46e5",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
};

export default Profile;