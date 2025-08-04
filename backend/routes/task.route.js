import { Router } from "express";
import {
  addTask,
  deleteTask,
  editTask,
  getTaskById,
  tasks,
  updateStatus,
} from "../controllers/tasks.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addtask").post(auth, addTask);
router.route("/tasks").get(auth, tasks);
router.route("/deletetask/:id").delete(auth, deleteTask);
router.route("/updatetask/:id").put(auth, editTask);
router.route("/updatestatus/:id").put(updateStatus);
router.route("/taskbyid/:id").get(auth, getTaskById);

export default router;
