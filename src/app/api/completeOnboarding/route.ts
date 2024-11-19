// app/api/completeOnboarding/route.ts

import { NextResponse } from "next/server";
import { onboardingSchema, OnboardingData } from "@/shared/validation/auth";
import { validate } from "@/utils/server/validate";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data: OnboardingData = validate(onboardingSchema, body);

    // Mock logic for completing onboarding
    // Here you can save data to your database

    // For demonstration, we'll return the received data
    return NextResponse.json({
      error: false,
      message: "Onboarding completed successfully",
      data: data,
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
