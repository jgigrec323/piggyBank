import mongoose from "mongoose";

const spendingActivitySchema = new mongoose.Schema({
  name: String,
  amountSpent: Number,
  amountLeft: Number,
  description: String,
  time: { type: Date, default: Date.now },
  childId: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
});

export default mongoose.model("SpendingActivity", spendingActivitySchema);
