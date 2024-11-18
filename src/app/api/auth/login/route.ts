import { NextRequest, NextResponse } from "next/server";
import { loginSchema, LoginData } from "@/shared/validation/auth";
import { validate } from "@/utils/server/validate";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data: LoginData = validate(loginSchema, body);

    // Mock authentication logic
    if (data.email === "anurag@gmail.com" && data.password === "anurag123") {
      return NextResponse.json({
        error: false,
        message: "Login successful",
        user: data,
      });
    }

    return NextResponse.json(
      { error: true, message: "Invalid credentials" },
      { status: 401 }
    );
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
