import { Router } from "express";
import {
  addTask,
  deleteTask,
  editTask,
  getTaskById,
  updateStatus,
} from "../controllers/tasks.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addtask").post(auth, addTask);
router.route("/deletetask/:id").delete(auth, deleteTask);
router.route("/updatetask/:id").put(auth, editTask);
router.route("/updatestatus/:id").put(auth, updateStatus);
router.route("/taskbyid/:id").get(auth, getTaskById);

export default router;
