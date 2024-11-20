import { NextResponse } from "next/server";

export async function GET() {
  // Generate a random boolean value for `verified`
  const isVerified = Math.random() >= 0.5; // 50% chance of being true or false

  // Return dummy user data with a random `verified` value
  const user = {
    name: "Anurag Subedi",
    email: "anuragsubedi180@gmail.com",
    verified: isVerified,
    avatar: "/logo.png",
  };

  return NextResponse.json({ user });
}
