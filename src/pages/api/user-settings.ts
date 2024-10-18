import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "../../../lib/mongodb";
import mongoose from "mongoose";

// Define the UserSettings schema
const UserSettingsSchema = new mongoose.Schema({
  userId: String,
  darkMode: Boolean,
  privacySettings: {
    showEmail: Boolean,
    showFullName: Boolean,
    allowDataCollection: Boolean,
  },
});

// Create the model (only if it doesn't already exist)
const UserSettings =
  mongoose.models.UserSettings ||
  mongoose.model("UserSettings", UserSettingsSchema);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await dbConnect();

  if (req.method === "GET") {
    try {
      let userSettings = await UserSettings.findOne({ userId });

      if (!userSettings) {
        // If no settings found, return default settings
        return res.status(200).json({
          darkMode: false,
          privacySettings: {
            showEmail: true,
            showFullName: true,
            allowDataCollection: true,
          },
        });
      }

      return res.status(200).json(userSettings);
    } catch (error) {
      // console.error("Error fetching user settings:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const { darkMode, privacySettings } = req.body;

      const updatedSettings = await UserSettings.findOneAndUpdate(
        { userId },
        { darkMode, privacySettings },
        { new: true, upsert: true }
      );

      return res.status(200).json(updatedSettings);
    } catch (error) {
      // console.error("Error updating user settings:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
