const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User");
const asyncHandler = require("../middleware/asynchandler");

const registerUser=asyncHandler (async(req,res)=>{
  
    const {name,email,password}=req.body;
    if (!name|| !email || !password){
        return res.status(400).json({
            message:"All fields are required"
        });
    }
// existing User
const existingUser=await User.findOne({
    email:email
});
if (existingUser){
    return res.status(400).json({
        message:"User already exists"
    });
}

//3.hash password
const hashedPassword=await bcrypt.hash(password,10)
const user=await User.create({
    name,
    email,
    password:hashedPassword
});



res.status(201).json(
    {
        message:"user Registered Successfully",
        userId: user._id
    });

});


// login methods
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password required"
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "invalid credentials"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            message: "invalid credentials"
        });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.status(200).json({
        message: "login successful",
        token
    });
});

const getProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.userId)
        .select("-password");

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json(user);

});

module.exports = {
    registerUser,
    loginUser,
    getProfile
};