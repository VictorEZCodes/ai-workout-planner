import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Activity ||
  mongoose.model("Activity", ActivitySchema);
