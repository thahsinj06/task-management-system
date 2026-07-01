const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authroutes");
const taskRoutes = require("./routes/taskroutes");

const errorHandler = require("./middleware/errormiddleware");

dotenv.config();
connectDB();

const app = express();

// CORS
// CORS
app.use(
    cors({
        origin: true,
    })
);

// Body Parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running",
    });
});
app.get("/test", (req, res) => {
    res.send("server is working");
});

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Error Handler (Always Last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});