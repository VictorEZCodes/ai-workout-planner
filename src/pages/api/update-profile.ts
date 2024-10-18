import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { firstName, lastName } = req.body;

    // console.log("Attempting to update user:", userId);
    // console.log("Update data:", { firstName, lastName });

    const user = await clerkClient.users.updateUser(userId, {
      firstName,
      lastName,
    });

    // console.log("User updated successfully:", user);

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user });
  } catch (error: any) {
    // console.error("Error updating profile:", error);
    return res
      .status(500)
      .json({ message: "Failed to update profile", error: error.message });
  }
}
