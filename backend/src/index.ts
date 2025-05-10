import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Piggy Bank API running...");
});

app.use("/api/parent", require("./routes/parentRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
