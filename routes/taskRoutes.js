const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
  completeAllTasks,
  uncompleteAllTasks,
} = require("../controllers/taskController");

router.route("/").get(protect, getTasks).post(protect, createTask);
router
  .route("/:id")
  .put(protect, updateTask)
  .delete(protect, deleteTask)
  .get(getSingleTask);

router.patch("/complete-all", protect, completeAllTasks);
router.patch("/uncomplete-all", protect, uncompleteAllTasks);

module.exports = router;
