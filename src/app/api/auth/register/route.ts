import { NextRequest, NextResponse } from "next/server";
import { registerSchema, RegisterData } from "@/shared/validation/auth";
import { validate } from "@/utils/server/validate";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data: RegisterData = validate(registerSchema, body);

    // Mock registration logic
    if (data.email === "existing@example.com") {
      return NextResponse.json(
        { error: true, message: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json({
      error: false,
      message: "Registration successful",
      user: { name: data.name, email: data.email },
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
