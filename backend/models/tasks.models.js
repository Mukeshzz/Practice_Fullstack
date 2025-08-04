import mongoose, { Schema } from "mongoose";

const tasksSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    modifiedDate: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Tasks = mongoose.model("Tasks", tasksSchema);
