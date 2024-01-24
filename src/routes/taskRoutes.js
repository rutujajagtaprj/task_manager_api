const express = require("express");
const taskController = require("../../controllers/taskController");
const router = express.Router();

router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getOneTask);
router.post("/", taskController.createNewtask);
router.put("/:id", taskController.updateOneTask);
router.delete("/:id", taskController.deleteOneTask);
router.get("/priority/:level", taskController.getTasksWithPriority);

module.exports = router;