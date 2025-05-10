import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  deadline: Date,
  pointsToEarn: Number,
  completed: { type: Boolean, default: false },
  timeCompleted: Date,
  childId: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
});

export default mongoose.model("Task", taskSchema);
