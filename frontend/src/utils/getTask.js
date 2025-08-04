import axios from "axios";
import { setTasks } from "../redux/taskSlice";

const getTask = async (userId, dispatch) => {
  const res = await axios.get(
    `http://localhost:8000/api/v1/todo/taskbyid/${userId}`,
    {
      withCredentials: true,
    }
  );

  console.log(res.data.tasks);

  dispatch(setTasks(res.data.tasks));
};

export default getTask;
