import { NextRequest, NextResponse } from "next/server";
import {
  forgotPasswordSchema,
  ForgotPasswordData,
} from "@/shared/validation/auth";
import { validate } from "@/utils/server/validate";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data: ForgotPasswordData = validate(forgotPasswordSchema, body);

    // Mock forgot password logic
    if (data.email === "nonexistent@example.com") {
      return NextResponse.json(
        { error: true, message: "Email not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      error: false,
      message: "Password reset email sent",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
