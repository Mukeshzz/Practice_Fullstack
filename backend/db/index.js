import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URl}/${DB_NAME}`
    );
    console.log(
      `MongoDB Connection Successfull!!!: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connection Failed");
  }
};

export default connectDB;
