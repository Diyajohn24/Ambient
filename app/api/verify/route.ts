import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  const { token } = await request.json();

  const payload = verifyToken(token);

  if (payload) {
    return NextResponse.json({
      valid: true,
      payload,
    });
  }

  return NextResponse.json({
    valid: false,
  });
}