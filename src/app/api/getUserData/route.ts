import { NextResponse } from "next/server";

export async function GET() {
  // Return dummy user data
  const user = {
    name: "Anurag Subedi",
    email: "anuragsubedi180@gmail.com",
    avatar: "/logo.png",
  };

  return NextResponse.json({ user });
}
