import { NextResponse } from "next/server";
import { generateSignature } from "@/lib/cloudinary";
import { verifySession } from "@/lib/auth";

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const signatureData = generateSignature();
  return NextResponse.json(signatureData);
}
