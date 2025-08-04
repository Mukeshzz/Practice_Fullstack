import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { addTasks, deleteTask, reset, update } from "../redux/taskSlice.js";
import getTask from "../utils/getTask.js";

function Homepage() {
  const { user } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  const [task, setTask] = useState({
    name: "",
    description: "",
    dueDate: "",
  });

  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const addTask = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo/addtask",
        task,
        {
          withCredentials: true,
        }
      );

      dispatch(addTasks(res.data.task));
      setTask({
        name: "",
        description: "",
        dueDate: "",
      });
    } catch (error) {
      console.error(
        "Error adding task:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (user?._id) {
      getTask(user._id, dispatch);
    }
  }, [user?.id, dispatch]);

  const handleEdit = (id) => {
    setEdit(true);
    const editTask = tasks.filter((task) => task._id === id);

    setTask(editTask[0]);
  };

  const updateTask = async () => {
    const res = await axios.put(
      `http://localhost:8000/api/v1/todo/updatetask/${task._id}`,
      task,
      { withCredentials: true }
    );

    dispatch(update(task));
    alert(res.data.message);
    setTask({
      name: "",
      description: "",
      dueDate: "",
      status: false,
    });
    setEdit(false);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `http://localhost:8000/api/v1/todo/deletetask/${id}`,
      { withCredentials: true }
    );

    const task = tasks.filter((task) => task._id === id);

    dispatch(deleteTask(task[0]));
  };

  const handleCheckbox = async (id) => {
    const selectedTask = tasks.find((task) => task._id === id);
    const updatedStatus = !selectedTask.status;
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/todo/updatestatus/${id}`,
        { status: updatedStatus },
        { withCredentials: true }
      );
      dispatch(update(res.data.updatedTask));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/todo/logout", {
        withCredentials: true,
      });

      alert(res.data.message);
      dispatch(reset());
      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.log("Error while logout", error);
    }
  };

  return (
    <>
      <div>
        <h1>To Do App</h1>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleChange}
        />
        <label htmlFor="">Description</label>
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
        <label htmlFor="">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
        <button onClick={edit ? updateTask : addTask}>
          {edit ? "Update Task" : "Add Task"}
        </button>
        <button onClick={logout}>Logout</button>
      </div>
      <hr />
      <div>
        {tasks.map((task) => {
          return (
            <div key={task._id}>
              <h4>Name:{task.name}</h4>
              <p>Description: {task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Modified Date: {task.modifiedDate}</p>
              <p>
                Status:{" "}
                <input
                  type="checkbox"
                  checked={task.status}
                  onChange={() => handleCheckbox(task._id)}
                />
                {task.status ? "Completed" : "Pending"}
              </p>
              <button onClick={() => handleEdit(task._id)}>Edit</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Homepage;
