import { NextResponse } from "next/server";

export async function GET() {
  // Generate a random boolean value for `verified`
  //const isVerified = Math.random() >= 0.5; // 50% chance of being true or false

  // Return dummy user data with a random `verified` value
  const user = {
    username: "anurag",
    name: "Anurag Subedi",
    address: "Deumai-4, Ilam",
    email: "anuragsubedi180@gmail.com",
    contact: "9816957955",
    verified: true,
    avatar: "/logo.png",
  };

  return NextResponse.json({ user });
}
