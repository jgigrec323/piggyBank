import mongoose from "mongoose";

const savingGoalSchema = new mongoose.Schema({
  name: String,
  targetAmount: Number,
  currentAmount: { type: Number, default: 0 },
  deadline: Date,
  childId: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
});

export default mongoose.model("SavingGoal", savingGoalSchema);
