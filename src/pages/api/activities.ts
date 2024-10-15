import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "../../../lib/mongodb";
import Activity from "../../models/Activity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const activities = await Activity.find({ userId })
          .sort({ createdAt: -1 })
          .limit(5);
        res.status(200).json(activities);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch activities" });
      }
      break;

    case "POST":
      try {
        const { type, description } = req.body;
        const activity = await Activity.create({ userId, type, description });
        res.status(201).json(activity);
      } catch (error) {
        res.status(500).json({ error: "Failed to create activity" });
      }
      break;

    case "DELETE":
      try {
        await Activity.deleteMany({ userId });
        res.status(200).json({ message: "All activities cleared" });
      } catch (error) {
        res.status(500).json({ error: "Failed to clear activities" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
