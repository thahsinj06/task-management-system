const Task = require("../models/task");
const asyncHandler = require("../middleware/asynchandler");

const createtask = asyncHandler(async (req, res) => {

    if (!req.body.title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
        user: req.user.userId
    });

    res.status(201).json(task);
});
const gettaskbyid=asyncHandler(async(req,res)=>{
    const task=await Task.findOne({
        _id:req.params.id,
        user:req.user.userId
    });
    if(!task){
        return res.status(404).json({
            message:"Task not found"
        });
    }
    res.status(200).json(task);
});
const gettasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.userId });
    res.status(200).json(tasks);
});

const updatetask = asyncHandler(async (req, res) => {
    const updatedtask = await Task.findOneAndUpdate(
        {
            _id: req.params.id,
            user: req.user.userId
        },
        req.body,
        { new: true }
    );

    if (!updatedtask) {
        return res.status(404).json({
            message: "Task not found or unauthorized"
        });
    }

    res.status(200).json(updatedtask);
});

const deletetask = asyncHandler(async (req, res) => {
    const deletedtask = await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user.userId
    });

    if (!deletedtask) {
        return res.status(404).json({
            message: "Task not found or unauthorized"
        });
    }

    res.status(200).json(deletedtask);
});

module.exports = {
    createtask,
    gettasks,
    gettaskbyid,
    updatetask,
    deletetask
};