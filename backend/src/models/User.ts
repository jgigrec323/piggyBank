import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Child" }],
});

export default mongoose.model("User", userSchema);
