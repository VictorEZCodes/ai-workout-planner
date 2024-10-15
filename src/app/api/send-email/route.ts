import { NextResponse } from "next/server";
import { sendEmail } from "../../../utils/api";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    console.log("Received request:", { name, email, message });

    const result = await sendEmail(name, email, message);
    console.log("Email sent successfully:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Detailed error in send-email route:", error);
    return NextResponse.json(
      { success: false, message: "Error sending email", error: error.message },
      { status: 500 }
    );
  }
}
