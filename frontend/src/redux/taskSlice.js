import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = [...action.payload];
    },
    addTasks: (state, action) => {
      state.tasks.push(action.payload);
    },
    update: (state, action) => {
      const updatedTasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );

      state.tasks = updatedTasks;
    },
    reset: (state) => {
      state.tasks = [];
    },
    deleteTask: (state, action) => {
      const updatedTasks = state.tasks.filter(
        (task) => task._id !== action.payload._id
      );
      state.tasks = updatedTasks;
    },
  },
});

export const { setTasks, reset, addTasks, update, deleteTask } =
  taskSlice.actions;
export default taskSlice.reducer;
