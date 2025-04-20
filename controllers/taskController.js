const Task = require("../models/Task");

// @desc    Get all tasks for a user
// @route   GET /api/tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a task
// @route   POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    // Validate due date
    if (dueDate && new Date(dueDate) < new Date().setHours(0, 0, 0, 0)) {
      return res
        .status(400)
        .json({ message: "Due date cannot be in the past" });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      userId: req.user._id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const { title, description, completed, dueDate } = req.body;

    // Validate due date
    if (dueDate && new Date(dueDate) < new Date().setHours(0, 0, 0, 0)) {
      return res
        .status(400)
        .json({ message: "Due date cannot be in the past" });
    }

    const task = await Task.findById(req.params.id);

    if (task) {
      task.title = title || task.title;
      task.description = description || task.description;
      task.completed = completed !== undefined ? completed : task.completed;
      task.dueDate = dueDate || task.dueDate;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    // console.log("first");
    const task = await Task.findById(req.params.id);
    // console.log(task);

    if (task) {
      await task.deleteOne();
      res.json({ message: "Task removed" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const completeAllTasks = async (req, res) => {
  try {
    await Task.updateMany({ userId: req.user._id }, { completed: true });

    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const uncompleteAllTasks = async (req, res) => {
  try {
    await Task.updateMany({ userId: req.user._id }, { completed: false });

    const tasks = await Task.find({ useuserIdr: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
  completeAllTasks,
  uncompleteAllTasks,
};
