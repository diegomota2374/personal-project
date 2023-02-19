const express = require("express");
const router = express.Router();
const tasksController = require("./controllers/tasksController");
const tasksMiddleWares = require("./middlewares/tasksMiddlewares");

router.get("/tasks", tasksController.getAll);
router.post(
  "/tasks",
  tasksMiddleWares.validateFieldTitle,
  tasksController.createTask
);
router.delete("/tasks/:id", tasksController.deleteTask);
router.put(
  "/tasks/:id",
  tasksMiddleWares.validateFieldTitle,
  tasksMiddleWares.validateFieldStatus,
  tasksController.updateTask
);

module.exports = router;
