import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
  name: String,
  surname: String,
  gender: String,
  dateOfBirth: Date,
  assignedPassword: String,
  coinBalance: { type: Number, default: 0 },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  spendingActivities: [
    { type: mongoose.Schema.Types.ObjectId, ref: "SpendingActivity" },
  ],
  savingGoals: [{ type: mongoose.Schema.Types.ObjectId, ref: "SavingGoal" }],
  avatar: {
    currentSkin: String,
    unlockedItems: [String],
    evolutionLevel: { type: Number, default: 0 },
  },
});

export default mongoose.model("Child", childSchema);
