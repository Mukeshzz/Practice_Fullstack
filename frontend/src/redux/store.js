import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import taskReducer from "./taskSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
  },
});

export default store;
