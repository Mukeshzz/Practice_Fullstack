import { Tasks } from "../models/tasks.models.js";

export const addTask = async (req, res) => {
  const { name, description, dueDate } = req.body;
  const userId = req.userId;

  if (!name || !description || !dueDate) {
    return res.status(400).json({
      message: "Something is missing",
      success: false,
    });
  }

  const date = new Date().toLocaleDateString();
  try {
    const task = await Tasks.create({
      name,
      description,
      dueDate,
      modifiedDate: date,
      status: false,
      user: userId,
    });

    return res.status(201).json({
      message: "Task Added Successfully",
      task,
      success: true,
    });
  } catch (error) {
    console.log("Error while adding task", error);
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    const tasks = await Tasks.find({ user: id });
    if (!tasks) {
      return res.status(400).json({
        message: "No tasks found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Tasks fecthed successsfully",
      tasks,
      success: true,
    });
  } catch (error) {
    console.log("Error while getting tasks", error);
    return res.status(500).json({
      message: "Error while getting tasks",
      success: false,
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "No data found",
      success: false,
    });
  }
  try {
    await Tasks.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error deleting task", error);
  }
};

export const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, dueDate } = req.body;
    if (!name || !description || !dueDate) {
      return res.status(400).json({
        message: "Please fill input fields",
        success: false,
      });
    }

    const updatedTask = await Tasks.findByIdAndUpdate(
      id,
      { name, description, dueDate },
      { new: true }
    );

    return res.status(201).json({
      message: "Successfully updated",
      updatedTask,
      success: true,
    });
  } catch (error) {
    console.log("Error while editing task", error);
  }
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedTask = await Tasks.findByIdAndUpdate(
      id,
      { status, modifiedDate: new Date().toLocaleDateString() },
      { new: true }
    );

    return res.status(200).json({
      message: "Staus updated successfully",
      updatedTask,
      success: true,
    });
  } catch (error) {
    console.log("Error updating status: ", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
