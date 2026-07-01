const User = require("../models/user");
const asyncHandler = require("../middleware/asynchandler");

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
});

module.exports = { getUsers };