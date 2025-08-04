import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

import taskRoute from "./routes/task.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";

app.use("/api/v1/todo", taskRoute);
app.use("/api/v1/todo", userRoute);

export { app };
