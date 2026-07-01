const express=require("express");
const router=express.Router();
const protect = require("../middleware/authmiddleware");
const {
    createtask,
    gettasks,
    gettaskbyid,
    updatetask,
    deletetask
} = require("../controllers/taskcontroller");




router.post("/", protect, createtask);     // Protected
router.get("/", protect, gettasks);       // Protected 
router.get("/:id",protect,gettaskbyid);
router.put("/:id", protect, updatetask);   // Protected
router.delete("/:id", protect, deletetask); // Protected

module.exports = router;
