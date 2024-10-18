import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "../../../lib/mongodb";
import User from "../../models/User";
import Workout from "../../models/Workout";
import Nutrition from "../../models/Nutrition";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log("Dashboard API called");
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await dbConnect();
    // console.log("Connected to MongoDB");

    if (req.method === "GET") {
      // console.log("Fetching data for user:", userId);

      const user = await User.findOne({ clerkId: userId });
      if (!user) {
        // console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }

      const workouts = await Workout.find({ userId: user._id })
        .sort({ date: -1 })
        .limit(5);
      const nutritionLogs = await Nutrition.find({ userId: user._id })
        .sort({ date: -1 })
        .limit(5);

      const totalWorkouts = await Workout.countDocuments({ userId: user._id });
      const completedGoals = 7; // You'll need to implement goal tracking
      const averageHeartRate = 72; // You'll need to implement heart rate tracking
      const calorieIntake = await Nutrition.aggregate([
        { $match: { userId: user._id } },
        { $group: { _id: null, totalCalories: { $avg: "$totalCalories" } } },
      ]);

      // console.log("Sending dashboard data");
      res.status(200).json({
        totalWorkouts,
        completedGoals,
        averageHeartRate,
        calorieIntake: calorieIntake[0]?.totalCalories || 0,
        recentWorkouts: workouts,
        recentNutrition: nutritionLogs,
      });
    } else {
      // console.log("Method not allowed:", req.method);
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    // console.error("Error in dashboard API:", error);
    res
      .status(500)
      .json({ error: "Error fetching dashboard data", details: error.message });
  }
}
