import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
        weight: { type: Number },
      },
    ],
    duration: { type: Number },
    caloriesBurned: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.Workout ||
  mongoose.model("Workout", WorkoutSchema);
