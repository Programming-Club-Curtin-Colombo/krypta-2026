import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // You can use NEXT_PUBLIC_EMAIL_SUBMISSION_ENDPOINT or a private env var.
    const endpoint = process.env.NEXT_PUBLIC_EMAIL_SUBMISSION_ENDPOINT;

    if (!endpoint) {
      console.error("Missing EMAIL_SUBMISSION_ENDPOINT environment variable.");
      return NextResponse.json(
        { success: false, message: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to submit email to external service" },
        { status: response.status }
      );
    }

    // Attempt to parse Apps Script response, fallback if it returns raw text
    let data;
    const textData = await response.text();
    try {
      data = JSON.parse(textData);
    } catch {
      data = { success: true, message: textData };
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Subscription API Route Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
