import mongoose from "mongoose";

const NutritionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    meals: [
      {
        name: { type: String, required: true },
        calories: { type: Number, required: true },
        protein: { type: Number },
        carbs: { type: Number },
        fats: { type: Number },
      },
    ],
    totalCalories: { type: Number },
    totalProtein: { type: Number },
    totalCarbs: { type: Number },
    totalFats: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.Nutrition ||
  mongoose.model("Nutrition", NutritionSchema);
