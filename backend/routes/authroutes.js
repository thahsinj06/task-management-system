const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile
} = require("../controllers/authcontroller");

const protect = require("../middleware/authmiddleware");


// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);


// Protected route
router.get("/profile", protect, getProfile);


module.exports = router;