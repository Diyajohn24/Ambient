import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (
    email === "admin@ambient.com" &&
    password === "ambient123"
  ) {
    const token = createToken(email);

    return NextResponse.json({
      success: true,
      token,
    });
  }

  return NextResponse.json(
    {
      success: false,
      message: "Invalid credentials",
    },
    { status: 401 }
  );
}